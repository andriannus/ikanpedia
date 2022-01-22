import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AppBar } from "@/components/app-bar";
import { Box } from "@/components/box";
import { Chip } from "@/components/chip";
import { Area, Commodity, useApiInvoker } from "@/services/api-invoker";
import { rupiahCurrency } from "@/utils/rupiah.util";

import appBarStyles from "@/components/app-bar/app-bar.module.scss";
import homeStyles from "@/styles/home.module.scss";

interface Filter {
  city: string;
  province: string;
  size: string;
}

const Home: NextPage = () => {
  const { fetchAreas, fetchCommodities, fetchSizes } = useApiInvoker();
  const router = useRouter();

  const [areas, setAreas] = useState<Area[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [commodities, setCommodities] = useState<Commodity[]>([]);
  const [provinces, setProvinces] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);

  const [filter, setFilter] = useState<Partial<Filter>>({
    city: "",
    province: "",
    size: "",
  });

  const isFilterShown = !!cities.length || !!provinces.length || !!sizes.length;

  useEffect(() => {
    async function fetchAllData() {
      fetchAreas().then(({ areas, provinces }) => {
        setAreas(areas);
        setProvinces(provinces);
      });

      fetchCommodities().then((tempCommodities) =>
        setCommodities(tempCommodities),
      );

      fetchSizes().then((tempSizes) => setSizes(tempSizes));
    }

    fetchAllData();
  }, []);

  function selectCity(city: string): void {
    const validCity = filter.city === city ? "" : city;
    setFilter({ ...filter, city: validCity });
  }

  function selectProvince(province: string): void {
    const validProvince = filter.province === province ? "" : province;
    setFilter({ ...filter, province: validProvince });

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

  function navigateToDetailPage(): void {
    router.push("/detail");
  }

  function getFirstThree<T = any>(items: T[]) {
    const itemsCloned = JSON.parse(JSON.stringify(items)) as T[];
    const firstThree = itemsCloned.splice(0, 3);

    return firstThree;
  }

  return (
    <>
      <AppBar>
        <span className={appBarStyles["AppBar-brand"]}>Ikanpedia</span>
      </AppBar>

      {isFilterShown && (
        <Box className="mb-md">
          <p className="font-bold mb-bs text-base leading-5 text-gray-900">
            Filter
          </p>

          {sizes.length > 0 && (
            <div className="mb-bs">
              <div className="flex items-center justify-between mb-sm">
                <p className="text-sm leading-5">Ukuran</p>
                <span className={homeStyles["Link"]}>Tampilkan semua</span>
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
                  <span className={homeStyles["Link"]}>Tampilkan semua</span>
                )}
              </div>

              {getFirstThree(provinces).map((province, index) => {
                return (
                  <Chip
                    key={`province-${index}`}
                    active={filter.province === province}
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

          {filter.province && cities.length > 0 && (
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
                    active={filter.city === city}
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

      <Box>
        <p className="font-bold mb-bs text-base leading-5 text-gray-900">
          Data Komuditas Ikan
        </p>

        <ul className={homeStyles["List"]}>
          {commodities.map((commodity, index) => {
            return (
              <li
                key={`commodity-${index}`}
                className={homeStyles["List-item"]}
                onClick={navigateToDetailPage}
              >
                <div className={homeStyles["List-itemContent"]}>
                  <p className={homeStyles["List-itemTitle"]}>
                    {commodity.komoditas || "-"}
                  </p>

                  <strong className={homeStyles["List-itemSubtitle"]}>
                    {rupiahCurrency(commodity.price)}
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
            Menampilkan 25 dari 125 data
          </span>

          <button className={homeStyles["Pagination-button"]}>
            <FontAwesomeIcon className="text-ruby-500" icon="caret-left" />
          </button>

          <span className={homeStyles["Pagination-page"]}>0</span>

          <button className={homeStyles["Pagination-button"]}>
            <FontAwesomeIcon className="text-ruby-500" icon="caret-right" />
          </button>
        </div>
      </Box>
    </>
  );
};

export default Home;
