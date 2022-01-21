import type { NextPage } from "next";
import { AppBar, AppBarBackButton, AppBarTitle } from "@/components/app-bar";

import { Box } from "@/components/box";

const Detail: NextPage = () => {
  return (
    <>
      <AppBar>
        <AppBarBackButton href="/" />
        <AppBarTitle>Detail</AppBarTitle>
      </AppBar>

      <Box className="mb-md">
        <div className="border-b mb-bs pb-bs">
          <h1 className="font-bold text-base leading-5 text-gray-900">
            Nama komuditas
          </h1>
        </div>

        <div className="flex justify-between text-sm">
          <div>
            <p className="text-gray-700">Harga</p>
            <span className="text-base text-ruby-500">Rp45.000</span>
          </div>

          <div>
            <p className="text-gray-700">Ukuran</p>
            <span className="text-base">450</span>
          </div>
        </div>
      </Box>

      <Box className="flex justify-between mb-md text-sm">
        <strong>Dibuat di tanggal</strong>
        <span>25 Desember 2021</span>
      </Box>

      <Box className="flex justify-between text-sm">
        <strong>Lokasi</strong>
        <span>Buleleng, Bali</span>
      </Box>
    </>
  );
};

export default Detail;
