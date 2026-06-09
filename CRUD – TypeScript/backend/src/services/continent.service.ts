import prisma from "../prisma/client";

export const createContinentService = async (
  nome: string,
  descricao?: string,
) => {
  return await prisma.continente.create({ data: { nome, descricao } });
};

export const getContinentsService = async (
  page: number,
  pageSize: number,
  search?: string,
) => {
  const where = search ? { nome: { contains: search } } : undefined;

  const [continentes, total] = await Promise.all([
    prisma.continente.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { nome: "asc" },
    }),
    prisma.continente.count({ where }),
  ]);

  return { continentes, total };
};

export const getContinentByIdService = async (id: number) => {
  return await prisma.continente.findUnique({
    where: { id },
    include: { paises: true },
  });
};

export const updateContinentService = async (
  id: number,
  nome: string,
  descricao?: string,
) => {
  return await prisma.continente.update({
    where: { id },
    data: { nome, descricao },
  });
};

export const deleteContinentService = async (id: number) => {
  return await prisma.continente.delete({ where: { id } });
};
