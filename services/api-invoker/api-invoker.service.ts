import SteinStore from "stein-js-client";

interface ApiInvokerService {
  createCommodity(commodity: Commodity): Promise<void>;
  deleteCommodity(id: string): Promise<void>;
  fetchAreas(): Promise<Areas>;
  fetchCommodities(search?: Record<string, string>): Promise<Commodity[]>;
  fetchSizes(): Promise<string[]>;
  updateCommodity(
    commodity: Omit<Commodity, "uuid">,
    uuid: string,
  ): Promise<void>;
}

export interface Area {
  city: string;
  province: string;
}

interface Areas {
  areas: Area[];
  cities: string[];
  provinces: string[];
}

export interface Commodity {
  area_kota: string;
  area_provinsi: string;
  komoditas: string;
  price: string;
  size: string;
  tgl_parsed: string;
  timestamp: string;
  uuid: string;
}

export function useApiInvoker(): ApiInvokerService {
  const STEIN_URL =
    "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4";

  const apiInvoker = new SteinStore(STEIN_URL);

  async function fetchCommodities(
    search: Record<string, string> = {},
  ): Promise<Commodity[]> {
    const validSearch = Object.fromEntries(
      Object.entries(search).filter(([_, v]) => !!v),
    );
    const commodities: Commodity[] = await apiInvoker.read("list", {
      search: validSearch,
    });
    const validCommodities = commodities.filter((commodity) => {
      return !!commodity.uuid;
    });

    return validCommodities;
  }

  async function fetchAreas(): Promise<Areas> {
    const areas = await apiInvoker.read("option_area");
    const cities = areas.map((area: Area) => area.city);
    const provinces = Array.from<string>(
      new Set(areas.map((area: Area) => area.province)),
    );

    return { areas, cities, provinces };
  }

  async function fetchSizes(): Promise<string[]> {
    const sizes = await apiInvoker.read("option_size");
    const validSizes = sizes.map(({ size }: { size: string }) => size);

    return validSizes;
  }

  function deleteCommodity(id: string): Promise<void> {
    return apiInvoker.delete("list", { search: { uuid: id } });
  }

  function createCommodity(commodity: Commodity): Promise<void> {
    return apiInvoker.append("list", [commodity]);
  }

  function updateCommodity(
    commodity: Omit<Commodity, "uuid">,
    uuid: string,
  ): Promise<void> {
    return apiInvoker.edit("list", {
      search: { uuid },
      set: commodity,
    });
  }

  return {
    createCommodity,
    deleteCommodity,
    fetchCommodities,
    fetchAreas,
    fetchSizes,
    updateCommodity,
  };
}
