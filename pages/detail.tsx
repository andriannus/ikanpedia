import type { NextPage } from "next";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import { AppBar, AppBarBackButton, AppBarTitle } from "@/components/app-bar";
import { Box } from "@/components/box";
import { Button } from "@/components/button";
import { Dialog } from "@/components/dialog";
import { EFY_COMMODITY } from "@/constants/storage.constant";
import { Commodity, useApiInvoker } from "@/services/api-invoker";
import { useLocalStorage } from "@/services/local-storage";
import { transformToDateLongFormat } from "@/utils/date";
import { rupiahCurrency } from "@/utils/rupiah";

import dialogStyles from "@/components/dialog/dialog.module.scss";

const Detail: NextPage = () => {
  const { deleteCommodity } = useApiInvoker();
  const ls = useLocalStorage();
  const router = useRouter();

  const [commodity, setCommodity] = useState<Commodity>({} as Commodity);
  const [isDialogShown, setDialogStatus] = useState(false);
  const [isReady, setReady] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const tempCommodity = ls.get<Commodity>(EFY_COMMODITY);

    setCommodity(tempCommodity);
    setReady(true);
  }, []);

  if (!isReady) return null;

  async function handleDeleteCommodity(id: string): Promise<void> {
    setLoading(true);

    try {
      await deleteCommodity(id);

      ls.remove(EFY_COMMODITY);
      setDialogStatus(false);
      router.replace("/");
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  }

  const DialogActions: FC<{}> = () => {
    return (
      <div className={dialogStyles["Dialog-actions"]}>
        <button
          className={`${dialogStyles["Dialog-action"]} mr-xs`}
          disabled={isLoading}
          onClick={() => handleDeleteCommodity(commodity.uuid)}
        >
          Hapus
        </button>

        <button
          className={`${dialogStyles["Dialog-action"]} ml-xs`}
          disabled={isLoading}
          onClick={() => setDialogStatus(false)}
        >
          <strong>Batal</strong>
        </button>
      </div>
    );
  };

  return (
    <>
      <AppBar>
        <AppBarBackButton href="/" />
        <AppBarTitle>Detail</AppBarTitle>
      </AppBar>

      {!commodity.uuid ? (
        <p className="text-center text-xs">
          Pilih commodity terlebih dahulu melalui halaman home.
        </p>
      ) : (
        <>
          <Box className="mb-md">
            <div className="border-b mb-bs pb-bs">
              <h1 className="font-bold text-base leading-5 text-gray-900">
                {commodity.komoditas}
              </h1>
            </div>

            <div className="flex justify-between text-sm">
              <div>
                <p className="text-gray-700">Harga</p>
                <span className="text-base text-ruby-500">
                  {rupiahCurrency(commodity.price)}
                </span>
              </div>

              <div className="text-right">
                <p className="text-gray-700">Ukuran</p>
                <span className="text-base">{commodity.size}</span>
              </div>
            </div>
          </Box>

          <Box className="flex justify-between mb-md text-sm">
            <strong>Dibuat di tanggal</strong>
            <span>
              {transformToDateLongFormat(new Date(commodity.tgl_parsed))}
            </span>
          </Box>

          <Box className="flex justify-between mb-md text-sm">
            <strong>Lokasi</strong>
            <span className="capitalize">
              {`${commodity.area_kota.toLowerCase()}, ${commodity.area_provinsi.toLowerCase()}`}
            </span>
          </Box>

          <div className="flex mx-xs mobile:mx-0">
            <div className="mr-xs w-full">
              <Button href="/edit" fullWidth small>
                Edit
              </Button>
            </div>

            <div className="ml-xs w-full">
              <Button
                color="primary"
                fullWidth
                small
                onClick={() => setDialogStatus(true)}
              >
                Delete
              </Button>
            </div>
          </div>
        </>
      )}

      <Dialog
        value={isDialogShown}
        actions={<DialogActions />}
        onChange={setDialogStatus}
      >
        <p>
          Apakah Anda yakin ingin menghapus komuditas{" "}
          <strong>{commodity.komoditas}</strong>?
        </p>
      </Dialog>
    </>
  );
};

export default Detail;
