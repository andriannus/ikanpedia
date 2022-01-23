import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { AppBar, AppBarBackButton, AppBarTitle } from "@/components/app-bar";
import { Box } from "@/components/box";
import { Button } from "@/components/button";
import { Select } from "@/components/select";
import { TextField } from "@/components/text-field";
import { EFY_COMMODITY } from "@/constants/storage.constant";
import { Area, Commodity, useApiInvoker } from "@/services/api-invoker";
import { useLocalStorage } from "@/services/local-storage";

interface Loading {
  isFetch: boolean;
  isSubmit: boolean;
}

const Edit: NextPage = () => {
  const { fetchAreas, fetchSizes, updateCommodity } = useApiInvoker();
  const ls = useLocalStorage();
  const router = useRouter();

  const [loading, setLoading] = useState<Partial<Loading>>({
    isFetch: false,
    isSubmit: false,
  });
  const [areas, setAreas] = useState<Area[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [commodity, setCommodity] = useState<Partial<Commodity>>({});

  useEffect(() => {
    async function fetchAllData(): Promise<void> {
      setLoading({ isFetch: true });

      try {
        const tempSizes = await fetchSizes();
        const tempAreas = await fetchAreas();

        setSizes(tempSizes);
        setAreas(tempAreas.areas);
        setCities(tempAreas.cities);
      } catch (error) {
        //
      } finally {
        setLoading({ isFetch: false });
      }
    }

    const tempCommodity = ls.get<Commodity>(EFY_COMMODITY);
    setCommodity(tempCommodity);

    fetchAllData();
  }, []);

  function handleNameChange(event: ChangeEvent<HTMLInputElement>): void {
    setCommodity({
      ...commodity,
      komoditas: event.target.value,
    });
  }

  function handlePriceChange(event: ChangeEvent<HTMLInputElement>): void {
    setCommodity({
      ...commodity,
      price: event.target.value,
    });
  }

  function handleSizeChange(event: ChangeEvent<HTMLSelectElement>): void {
    setCommodity({
      ...commodity,
      size: event.target.value,
    });
  }

  function handleCityChange(event: ChangeEvent<HTMLSelectElement>): void {
    setCommodity({
      ...commodity,
      area_kota: event.target.value,
    });
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const commodityData = getCommodityData();

    setLoading({ isSubmit: true });

    try {
      await updateCommodity(commodityData, commodity.uuid!);
      router.push("/");
    } catch (error) {
      //
    } finally {
      setLoading({ isSubmit: false });
    }
  }

  function getCommodityData(): Omit<Commodity, "uuid"> {
    const validArea = areas.find((area) => area.city === commodity.area_kota);
    const commodityCloned = JSON.parse(
      JSON.stringify(commodity),
    ) as Partial<Commodity>;

    commodityCloned.area_provinsi = validArea!.province;
    delete commodityCloned.uuid;

    return commodityCloned as Omit<Commodity, "uuid">;
  }

  return (
    <>
      <AppBar>
        <AppBarBackButton href="/" />
        <AppBarTitle>Tambah Komuditas</AppBarTitle>
      </AppBar>

      <Box>
        {loading.isFetch ? (
          <p className="text-xs text-center">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              value={commodity.komoditas}
              id="TxtCommodityName"
              className="mb-sm"
              placeholder="Nama Komoditas"
              onChange={handleNameChange}
            />

            <TextField
              value={commodity.price}
              id="TxtPrice"
              className="mb-sm"
              placeholder="Harga"
              type="number"
              onChange={handlePriceChange}
            />

            <Select
              value={commodity.size}
              id="SlcSize"
              className="mb-sm"
              items={sizes}
              placeholder="Pilih Ukuran"
              onChange={handleSizeChange}
            />

            <Select
              value={commodity.area_kota}
              id="SlcCity"
              className="mb-sm"
              items={cities}
              placeholder="Pilih Kota"
              onChange={handleCityChange}
            />

            <Button
              color="primary"
              fullWidth
              loading={loading.isSubmit}
              type="submit"
            >
              Submit
            </Button>
          </form>
        )}
      </Box>
    </>
  );
};

export default Edit;
