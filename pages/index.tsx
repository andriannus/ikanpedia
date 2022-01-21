import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AppBar } from "@/components/app-bar";
import { Box } from "@/components/box";
import { Chip } from "@/components/chip";

import appBarStyles from "@/components/app-bar/app-bar.module.scss";
import homeStyles from "@/styles/home.module.scss";

interface Filter {
  city: string;
  province: string;
  size: string;
}

const Home: NextPage = () => {
  const router = useRouter();

  const [filter, setFilter] = useState<Partial<Filter>>({
    city: "",
    province: "",
    size: "",
  });

  function selectCity(city: string): void {
    const validCity = filter.city === city ? "" : city;
    setFilter({ ...filter, city: validCity });
  }

  function selectProvince(province: string): void {
    const validProvince = filter.province === province ? "" : province;
    setFilter({ ...filter, province: validProvince });
  }

  function selectSize(size: string): void {
    const validSize = filter.size === size ? "" : size;
    setFilter({ ...filter, size: validSize });
  }

  function navigateToDetailPage(): void {
    router.push("/detail");
  }

  return (
    <>
      <AppBar>
        <span className={appBarStyles["AppBar-brand"]}>Ikanpedia</span>
      </AppBar>

      <Box className="mb-md">
        <p className="font-bold mb-bs text-base leading-5 text-gray-900">
          Filter
        </p>

        <div className="mb-bs">
          <p className="mb-sm text-sm leading-5">Ukuran</p>

          {["25", "50", "200", "100"].map((size, index) => {
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

        <div className="mb-bs">
          <p className="mb-sm text-sm leading-5">Provinsi</p>

          {["Jawa Barat", "Sumatera Utara", "Lampung", "Bali"].map(
            (province, index) => {
              return (
                <Chip
                  key={`province-${index}`}
                  active={filter.province === province}
                  button
                  className="mr-xs"
                  onClick={() => selectProvince(province)}
                >
                  {province}
                </Chip>
              );
            },
          )}
        </div>

        <div>
          <p className="mb-sm text-sm leading-5">Kota</p>

          {["Bogor", "Jakarta Selatan", "Medan", "Denpasar"].map(
            (city, index) => {
              return (
                <Chip
                  key={`city-${index}`}
                  active={filter.city === city}
                  button
                  className="mr-xs"
                  onClick={() => selectCity(city)}
                >
                  {city}
                </Chip>
              );
            },
          )}
        </div>
      </Box>

      <Box>
        <p className="font-bold mb-bs text-base leading-5 text-gray-900">
          Data Komuditas Ikan
        </p>

        <ul className={homeStyles["List"]}>
          <li
            className={homeStyles["List-item"]}
            onClick={navigateToDetailPage}
          >
            <div className={homeStyles["List-itemContent"]}>
              <p className={homeStyles["List-itemTitle"]}>Ikan Bawal</p>

              <strong className={homeStyles["List-itemSubtitle"]}>
                Rp50.000
              </strong>
            </div>

            <div className={homeStyles["List-itemAction"]}>
              <FontAwesomeIcon className="text-ruby-500" icon="chevron-right" />
            </div>
          </li>

          <li
            className={homeStyles["List-item"]}
            onClick={navigateToDetailPage}
          >
            <div className={homeStyles["List-itemContent"]}>
              <p className={homeStyles["List-itemTitle"]}>Ikan Bandeng</p>

              <strong className={homeStyles["List-itemSubtitle"]}>
                Rp72.000
              </strong>
            </div>

            <div className={homeStyles["List-itemAction"]}>
              <FontAwesomeIcon className="text-ruby-500" icon="chevron-right" />
            </div>
          </li>
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
