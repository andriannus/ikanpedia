import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AppBar } from "@/components/app-bar";
import { Box } from "@/components/box";
import { Chip } from "@/components/chip";
import { FilterProvince } from "@/components/filter-province";
import { FilterSize } from "@/components/filter-size";
import { Area, Commodity, useApiInvoker } from "@/services/api-invoker";
import { useLocalStorage } from "@/services/local-storage";
import { paginateData, PaginatedData } from "@/utils/paginate";
import { rupiahCurrency } from "@/utils/rupiah.util";

import appBarStyles from "@/components/app-bar/app-bar.module.scss";
import homeStyles from "@/styles/home.module.scss";

interface DialogStatus {
  isProvince: boolean;
  isSize: boolean;
}

interface Filter {
  area_kota: string;
  area_provinsi: string;
  size: string;
}

const Home: NextPage = () => {
  const { fetchAreas, fetchCommodities, fetchSizes } = useApiInvoker();
  const ls = useLocalStorage();
  const router = useRouter();

  const [areas, setAreas] = useState<Area[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [commodity, setCommodity] = useState<PaginatedData<Commodity>>(
    {} as PaginatedData<Commodity>,
  );
  const [provinces, setProvinces] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);

  const [filter, setFilter] = useState<Partial<Filter>>({
    area_kota: "",
    area_provinsi: "",
    size: "",
  });

  const [dialogShown, setDialogStatus] = useState<Partial<DialogStatus>>({
    isProvince: false,
    isSize: false,
  });

  const isFilterShown = !!cities.length || !!provinces.length || !!sizes.length;

  useEffect(() => {
    function fetchAllData() {
      fetchAreas().then(({ areas, provinces }) => {
        setAreas(areas);
        setProvinces(provinces);
      });

      paginateCommodities();

      fetchSizes().then((tempSizes) => setSizes(tempSizes));
    }

    fetchAllData();
  }, []);

  useEffect(() => {
    paginateCommodities(filter);
  }, [filter]);

  async function paginateCommodities(search = filter, page = 1): Promise<void> {
    const tempCommodities = await fetchCommodities(search);
    const paginatedCommodities = paginateData(tempCommodities, page);

    setCommodity(paginatedCommodities);
  }

  function selectCity(city: string): void {
    const validCity = filter.area_kota === city ? "" : city;
    setFilter({ ...filter, area_kota: validCity });
  }

  function selectProvince(province: string): void {
    const validProvince = filter.area_provinsi === province ? "" : province;
    setFilter({ ...filter, area_provinsi: validProvince, area_kota: "" });

    if (validProvince) {
      const validAreas = areas.filter(
        (area) => area.province === validProvince,
      );
      const cities = validAreas.map((validArea) => validArea.city);

      setCities(cities);
    }
  }

  function selectSize(size: string): void {
    const validSize = filter.size === size ? "" : size;
    setFilter({ ...filter, size: validSize });
  }

  function handleDetailCommodity(data: Commodity): void {
    ls.set("_efyCommodity", data);
    router.push("/detail");
  }

  function getFirstThree<T = any>(items: T[]): T[] {
    const itemsCloned = JSON.parse(JSON.stringify(items)) as T[];
    const firstThree = itemsCloned.splice(0, 3);

    return firstThree;
  }

  return (
    <>
      <AppBar>
        <span className={appBarStyles["AppBar-brand"]}>Ikanpedia</span>
      </AppBar>

      <FilterSize
        value={dialogShown.isSize}
        selected={filter.size}
        sizes={sizes}
        onChange={(isShown) => setDialogStatus({ isSize: isShown })}
        onSelect={(size) => selectSize(size)}
      />

      <FilterProvince
        value={dialogShown.isProvince}
        provinces={provinces}
        selected={filter.area_provinsi}
        onChange={(isShown) => setDialogStatus({ isSize: isShown })}
        onSelect={(size) => selectProvince(size)}
      />

      {isFilterShown && (
        <Box className="mb-md">
          <p className="font-bold mb-bs text-base leading-5 text-gray-900">
            Filter
          </p>

          {sizes.length > 0 && (
            <div className="mb-bs">
              <div className="flex items-center justify-between mb-sm">
                <p className="text-sm leading-5">Ukuran</p>

                <span
                  className={homeStyles["Link"]}
                  onClick={() => setDialogStatus({ isSize: true })}
                >
                  Tampilkan semua
                </span>
              </div>

              {getFirstThree(sizes).map((size, index) => {
                return (
                  <Chip
                    key={`size-${index}`}
                    active={filter.size === size}
                    button
                    className="mr-xs"
                    onClick={() => selectSize(size)}
                  >
                    {size}
                  </Chip>
                );
              })}
            </div>
          )}

          {provinces.length > 0 && (
            <div className="mb-bs">
              <div className="flex items-center justify-between mb-sm">
                <p className="text-sm leading-5">Provinsi</p>

                {provinces.length > 3 && (
                  <span
                    className={homeStyles["Link"]}
                    onClick={() => setDialogStatus({ isProvince: true })}
                  >
                    Tampilkan semua
                  </span>
                )}
              </div>

              {getFirstThree(provinces).map((province, index) => {
                return (
                  <Chip
                    key={`province-${index}`}
                    active={filter.area_provinsi === province}
                    button
                    className="capitalize mr-xs"
                    onClick={() => selectProvince(province)}
                  >
                    {province.toLowerCase()}
                  </Chip>
                );
              })}
            </div>
          )}

          {filter.area_provinsi && cities.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-sm">
                <p className="text-sm leading-5">Kota</p>

                {cities.length > 3 && (
                  <span className={homeStyles["Link"]}>Tampilkan semua</span>
                )}
              </div>

              {getFirstThree(cities).map((city, index) => {
                return (
                  <Chip
                    key={`city-${index}`}
                    active={filter.area_kota === city}
                    button
                    className="capitalize mr-xs"
                    onClick={() => selectCity(city)}
                  >
                    {city.toLowerCase()}
                  </Chip>
                );
              })}
            </div>
          )}
        </Box>
      )}

      {commodity.data && (
        <Box>
          <p className="font-bold mb-bs text-base leading-5 text-gray-900">
            Data Komuditas Ikan
          </p>

          {commodity.data.length < 1 ? (
            <p className="text-xs text-center">Data tidak ditemukan</p>
          ) : (
            <>
              <ul className={homeStyles["List"]}>
                {commodity.data.map((item, index) => {
                  return (
                    <li
                      key={`commodity-${index}`}
                      className={homeStyles["List-item"]}
                      onClick={() => handleDetailCommodity(item)}
                    >
                      <div className={homeStyles["List-itemContent"]}>
                        <p className={homeStyles["List-itemTitle"]}>
                          {item.komoditas || "-"}
                        </p>

                        <strong className={homeStyles["List-itemSubtitle"]}>
                          {rupiahCurrency(item.price)}
                        </strong>
                      </div>

                      <div className={homeStyles["List-itemAction"]}>
                        <FontAwesomeIcon
                          className="text-ruby-500"
                          icon="chevron-right"
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className={homeStyles["Pagination"]}>
                <span className={homeStyles["Pagination-text"]}>
                  Total ada {commodity.meta.total} data
                </span>

                <button
                  className={homeStyles["Pagination-button"]}
                  disabled={!commodity.meta.prevPage}
                  onClick={() =>
                    paginateCommodities(
                      filter,
                      commodity.meta.prevPage as number,
                    )
                  }
                >
                  <FontAwesomeIcon
                    className="text-ruby-500"
                    icon="caret-left"
                  />
                </button>

                <span className={homeStyles["Pagination-page"]}>
                  {commodity.meta.page}
                </span>

                <button
                  className={homeStyles["Pagination-button"]}
                  disabled={!commodity.meta.nextPage}
                  onClick={() =>
                    paginateCommodities(
                      filter,
                      commodity.meta.nextPage as number,
                    )
                  }
                >
                  <FontAwesomeIcon
                    className="text-ruby-500"
                    icon="caret-right"
                  />
                </button>
              </div>
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default Home;
