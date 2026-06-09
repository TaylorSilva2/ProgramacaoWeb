import prisma from "../prisma/client";

export const createCityService = async (
  nome: string,
  populacao: number,
  latitude: number,
  longitude: number,
  paisId: number,
) => {
  return await prisma.cidade.create({
    data: {
      nome,
      populacao: Math.round(populacao),
      latitude,
      longitude,
      paisId,
    },
  });
};

export const getCitiesService = async (
  page: number,
  pageSize: number,
  search?: string,
  countryId?: number,
  continentId?: number,
) => {
  const where: any = {};
  if (search) {
    where.nome = { contains: search };
  }
  if (countryId) {
    where.paisId = countryId;
  }
  if (continentId) {
    where.pais = { continenteId: continentId };
  }

  const [cities, total] = await Promise.all([
    prisma.cidade.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { nome: "asc" },
      include: { pais: { include: { continente: true } } },
    }),
    prisma.cidade.count({ where }),
  ]);

  return { cities, total };
};

export const getCityByIdService = async (id: number) => {
  return await prisma.cidade.findUnique({
    where: { id },
    include: { pais: { include: { continente: true } } },
  });
};

export const updateCityService = async (
  id: number,
  nome: string,
  populacao: number,
  latitude: number,
  longitude: number,
  paisId: number,
) => {
  return await prisma.cidade.update({
    where: { id },
    data: {
      nome,
      populacao: Math.round(populacao),
      latitude,
      longitude,
      paisId,
    },
  });
};

export const deleteCityService = async (id: number) => {
  return await prisma.cidade.delete({ where: { id } });
};
