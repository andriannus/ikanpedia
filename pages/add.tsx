import type { NextPage } from "next";
import { useRouter } from "next/router";
import { nanoid } from "nanoid";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { AppBar, AppBarBackButton, AppBarTitle } from "@/components/app-bar";
import { Box } from "@/components/box";
import { Button } from "@/components/button";
import { Select } from "@/components/select";
import { TextField } from "@/components/text-field";
import { Area, Commodity, useApiInvoker } from "@/services/api-invoker";
import { transformToDateTimeLongIsoFormat } from "@/utils/date";

interface Loading {
  isFetch: boolean;
  isSubmit: boolean;
}

const Add: NextPage = () => {
  const { createCommodity, fetchAreas, fetchSizes } = useApiInvoker();
  const router = useRouter();

  const [loading, setLoading] = useState<Partial<Loading>>({
    isFetch: false,
    isSubmit: false,
  });
  const [areas, setAreas] = useState<Area[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [commodity, setCommodity] = useState<Partial<Commodity>>({
    area_kota: "",
    komoditas: "",
    price: "",
    size: "",
    uuid: nanoid(),
  });

  useEffect(() => {
    async function fetchAllData() {
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

    const validCommodity = getCommodityData();

    setLoading({ isSubmit: true });

    try {
      await createCommodity(validCommodity as Required<Commodity>);
      router.push("/");
    } catch (error) {
      console.log("TES");
    } finally {
      setLoading({ isSubmit: false });
    }
  }

  function getCommodityData(): Commodity {
    const currentDate = new Date();
    const timestamp = currentDate.getTime().toString();
    const dateTimeIso = transformToDateTimeLongIsoFormat(currentDate);
    const validArea = areas.find((area) => area.city === commodity.area_kota);

    const commodityData = {
      ...(commodity as Required<Commodity>),
      area_provinsi: validArea!.province,
      timestamp,
      tgl_parsed: dateTimeIso,
    };

    return commodityData;
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

export default Add;
