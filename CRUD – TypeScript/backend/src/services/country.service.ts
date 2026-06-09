import prisma from "../prisma/client";

export const createCountryService = async (
  nome: string,
  populacao: number,
  idiomaOficial: string,
  moeda: string,
  continenteId: number,
) => {
  return await prisma.pais.create({
    data: {
      nome,
      populacao: Math.round(populacao),
      idiomaOficial,
      moeda,
      continenteId,
    },
  });
};

export const getCountriesService = async (
  page: number,
  pageSize: number,
  search?: string,
  continentId?: number,
  sortBy?: string,
) => {
  const where = {
    nome: search ? { contains: search } : undefined,
    continenteId: continentId || undefined,
  };

  const orderBy = sortBy ? { [sortBy]: "asc" as const } : { nome: "asc" };

  const [countries, total] = await Promise.all([
    prisma.pais.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy,
      include: { continente: true },
    }),
    prisma.pais.count({ where }),
  ]);

  return { countries, total };
};

export const getCountryByIdService = async (id: number) => {
  return await prisma.pais.findUnique({
    where: { id },
    include: { continente: true, cidades: true },
  });
};

export const updateCountryService = async (
  id: number,
  nome: string,
  populacao: number,
  idiomaOficial: string,
  moeda: string,
  continenteId: number,
) => {
  return await prisma.pais.update({
    where: { id },
    data: {
      nome,
      populacao: Math.round(populacao),
      idiomaOficial,
      moeda,
      continenteId,
    },
  });
};

export const deleteCountryService = async (id: number) => {
  return await prisma.pais.delete({ where: { id } });
};

export const getCountriesByContinentService = async (continentId: number) => {
  return await prisma.pais.findMany({
    where: { continenteId },
    include: { continente: true },
  });
};
