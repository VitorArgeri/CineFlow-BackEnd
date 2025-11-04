import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function clearDatabase() {
  // Ordem simples que respeita as FKs
  await prisma.registroSessao.deleteMany();
  await prisma.registroPedido.deleteMany();
  await prisma.registroSala.deleteMany();
  await prisma.sessao.deleteMany();
  await prisma.assento.deleteMany();
  await prisma.pedido.deleteMany();
  await prisma.alimento.deleteMany();
  await prisma.filme.deleteMany();
  await prisma.sala.deleteMany();
}

async function main() {
  await clearDatabase();

  // 10 FILMES (estilo simples, um a um)
  const filme1  = await prisma.filme.create({ data: { nome: "Filme 1",  dataLancamento: new Date("2020-01-01"), genero: "Ação",           duracaoMinutos: 101, avaliacao: 8.1 } });
  const filme2  = await prisma.filme.create({ data: { nome: "Filme 2",  dataLancamento: new Date("2020-01-02"), genero: "Drama",          duracaoMinutos: 102, avaliacao: 7.8 } });
  const filme3  = await prisma.filme.create({ data: { nome: "Filme 3",  dataLancamento: new Date("2020-01-03"), genero: "Comédia",        duracaoMinutos: 103, avaliacao: 7.5 } });
  const filme4  = await prisma.filme.create({ data: { nome: "Filme 4",  dataLancamento: new Date("2020-01-04"), genero: "Ficção",         duracaoMinutos: 104, avaliacao: 8.0 } });
  const filme5  = await prisma.filme.create({ data: { nome: "Filme 5",  dataLancamento: new Date("2020-01-05"), genero: "Terror",         duracaoMinutos: 105, avaliacao: 7.2 } });
  const filme6  = await prisma.filme.create({ data: { nome: "Filme 6",  dataLancamento: new Date("2020-01-06"), genero: "Aventura",       duracaoMinutos: 106, avaliacao: 7.9 } });
  const filme7  = await prisma.filme.create({ data: { nome: "Filme 7",  dataLancamento: new Date("2020-01-07"), genero: "Suspense",       duracaoMinutos: 107, avaliacao: 7.6 } });
  const filme8  = await prisma.filme.create({ data: { nome: "Filme 8",  dataLancamento: new Date("2020-01-08"), genero: "Ação",           duracaoMinutos: 108, avaliacao: 7.7 } });
  const filme9  = await prisma.filme.create({ data: { nome: "Filme 9",  dataLancamento: new Date("2020-01-09"), genero: "Drama",          duracaoMinutos: 109, avaliacao: 8.3 } });
  const filme10 = await prisma.filme.create({ data: { nome: "Filme 10", dataLancamento: new Date("2020-01-10"), genero: "Comédia",        duracaoMinutos: 110, avaliacao: 7.4 } });

  // 10 SALAS
  const sala1  = await prisma.sala.create({ data: { capacidade: 60 } });
  const sala2  = await prisma.sala.create({ data: { capacidade: 65 } });
  const sala3  = await prisma.sala.create({ data: { capacidade: 70 } });
  const sala4  = await prisma.sala.create({ data: { capacidade: 75 } });
  const sala5  = await prisma.sala.create({ data: { capacidade: 80 } });
  const sala6  = await prisma.sala.create({ data: { capacidade: 85 } });
  const sala7  = await prisma.sala.create({ data: { capacidade: 90 } });
  const sala8  = await prisma.sala.create({ data: { capacidade: 95 } });
  const sala9  = await prisma.sala.create({ data: { capacidade: 100 } });
  const sala10 = await prisma.sala.create({ data: { capacidade: 105 } });

  // 10 REGISTRO_SALA (filme[i] -> sala[i])
  await prisma.registroSala.create({ data: { filmeId: filme1.id,  salaId: sala1.id  } });
  await prisma.registroSala.create({ data: { filmeId: filme2.id,  salaId: sala2.id  } });
  await prisma.registroSala.create({ data: { filmeId: filme3.id,  salaId: sala3.id  } });
  await prisma.registroSala.create({ data: { filmeId: filme4.id,  salaId: sala4.id  } });
  await prisma.registroSala.create({ data: { filmeId: filme5.id,  salaId: sala5.id  } });
  await prisma.registroSala.create({ data: { filmeId: filme6.id,  salaId: sala6.id  } });
  await prisma.registroSala.create({ data: { filmeId: filme7.id,  salaId: sala7.id  } });
  await prisma.registroSala.create({ data: { filmeId: filme8.id,  salaId: sala8.id  } });
  await prisma.registroSala.create({ data: { filmeId: filme9.id,  salaId: sala9.id  } });
  await prisma.registroSala.create({ data: { filmeId: filme10.id, salaId: sala10.id } });

  // 10 ASSENTOS (um por sala)
  const assento1  = await prisma.assento.create({ data: { posicao: "A01", salaId: sala1.id,  status: "Livre" } });
  const assento2  = await prisma.assento.create({ data: { posicao: "A02", salaId: sala2.id,  status: "Livre" } });
  const assento3  = await prisma.assento.create({ data: { posicao: "A03", salaId: sala3.id,  status: "Livre" } });
  const assento4  = await prisma.assento.create({ data: { posicao: "A04", salaId: sala4.id,  status: "Livre" } });
  const assento5  = await prisma.assento.create({ data: { posicao: "A05", salaId: sala5.id,  status: "Livre" } });
  const assento6  = await prisma.assento.create({ data: { posicao: "A06", salaId: sala6.id,  status: "Livre" } });
  const assento7  = await prisma.assento.create({ data: { posicao: "A07", salaId: sala7.id,  status: "Livre" } });
  const assento8  = await prisma.assento.create({ data: { posicao: "A08", salaId: sala8.id,  status: "Livre" } });
  const assento9  = await prisma.assento.create({ data: { posicao: "A09", salaId: sala9.id,  status: "Livre" } });
  const assento10 = await prisma.assento.create({ data: { posicao: "A10", salaId: sala10.id, status: "Livre" } });

  // 10 SESSÕES (filme[i] na sala[i])
  const sessao1  = await prisma.sessao.create({ data: { tipo: "2D",  salaId: sala1.id,  filmeId: filme1.id,  dataHora: new Date("2025-11-05T14:00:00") } });
  const sessao2  = await prisma.sessao.create({ data: { tipo: "3D",  salaId: sala2.id,  filmeId: filme2.id,  dataHora: new Date("2025-11-05T15:00:00") } });
  const sessao3  = await prisma.sessao.create({ data: { tipo: "2D",  salaId: sala3.id,  filmeId: filme3.id,  dataHora: new Date("2025-11-05T16:00:00") } });
  const sessao4  = await prisma.sessao.create({ data: { tipo: "3D",  salaId: sala4.id,  filmeId: filme4.id,  dataHora: new Date("2025-11-05T17:00:00") } });
  const sessao5  = await prisma.sessao.create({ data: { tipo: "2D",  salaId: sala5.id,  filmeId: filme5.id,  dataHora: new Date("2025-11-05T18:00:00") } });
  const sessao6  = await prisma.sessao.create({ data: { tipo: "3D",  salaId: sala6.id,  filmeId: filme6.id,  dataHora: new Date("2025-11-05T19:00:00") } });
  const sessao7  = await prisma.sessao.create({ data: { tipo: "2D",  salaId: sala7.id,  filmeId: filme7.id,  dataHora: new Date("2025-11-05T20:00:00") } });
  const sessao8  = await prisma.sessao.create({ data: { tipo: "3D",  salaId: sala8.id,  filmeId: filme8.id,  dataHora: new Date("2025-11-05T21:00:00") } });
  const sessao9  = await prisma.sessao.create({ data: { tipo: "2D",  salaId: sala9.id,  filmeId: filme9.id,  dataHora: new Date("2025-11-05T22:00:00") } });
  const sessao10 = await prisma.sessao.create({ data: { tipo: "IMAX", salaId: sala10.id, filmeId: filme10.id, dataHora: new Date("2025-11-05T23:00:00") } });

  // 10 REGISTRO_SESSAO (sessao[i] com assento[i])
  await prisma.registroSessao.create({ data: { sessaoId: sessao1.id,  assentoId: assento1.id  } });
  await prisma.registroSessao.create({ data: { sessaoId: sessao2.id,  assentoId: assento2.id  } });
  await prisma.registroSessao.create({ data: { sessaoId: sessao3.id,  assentoId: assento3.id  } });
  await prisma.registroSessao.create({ data: { sessaoId: sessao4.id,  assentoId: assento4.id  } });
  await prisma.registroSessao.create({ data: { sessaoId: sessao5.id,  assentoId: assento5.id  } });
  await prisma.registroSessao.create({ data: { sessaoId: sessao6.id,  assentoId: assento6.id  } });
  await prisma.registroSessao.create({ data: { sessaoId: sessao7.id,  assentoId: assento7.id  } });
  await prisma.registroSessao.create({ data: { sessaoId: sessao8.id,  assentoId: assento8.id  } });
  await prisma.registroSessao.create({ data: { sessaoId: sessao9.id,  assentoId: assento9.id  } });
  await prisma.registroSessao.create({ data: { sessaoId: sessao10.id, assentoId: assento10.id } });

  // 10 ALIMENTOS
  const alimento1  = await prisma.alimento.create({ data: { nome: "Alimento 1",  preco: "5.00"  } });
  const alimento2  = await prisma.alimento.create({ data: { nome: "Alimento 2",  preco: "6.00"  } });
  const alimento3  = await prisma.alimento.create({ data: { nome: "Alimento 3",  preco: "7.00"  } });
  const alimento4  = await prisma.alimento.create({ data: { nome: "Alimento 4",  preco: "8.00"  } });
  const alimento5  = await prisma.alimento.create({ data: { nome: "Alimento 5",  preco: "9.00"  } });
  const alimento6  = await prisma.alimento.create({ data: { nome: "Alimento 6",  preco: "10.00" } });
  const alimento7  = await prisma.alimento.create({ data: { nome: "Alimento 7",  preco: "11.00" } });
  const alimento8  = await prisma.alimento.create({ data: { nome: "Alimento 8",  preco: "12.00" } });
  const alimento9  = await prisma.alimento.create({ data: { nome: "Alimento 9",  preco: "13.00" } });
  const alimento10 = await prisma.alimento.create({ data: { nome: "Alimento 10", preco: "14.00" } });

  // 10 PEDIDOS
  const pedido1  = await prisma.pedido.create({ data: { precoTotal: "30.00", status: "Pendente",  qrCode: "QR-1"  } });
  const pedido2  = await prisma.pedido.create({ data: { precoTotal: "32.00", status: "Confirmado", qrCode: "QR-2"  } });
  const pedido3  = await prisma.pedido.create({ data: { precoTotal: "34.00", status: "Cancelado",  qrCode: "QR-3"  } });
  const pedido4  = await prisma.pedido.create({ data: { precoTotal: "36.00", status: "Pendente",  qrCode: "QR-4"  } });
  const pedido5  = await prisma.pedido.create({ data: { precoTotal: "38.00", status: "Confirmado", qrCode: "QR-5"  } });
  const pedido6  = await prisma.pedido.create({ data: { precoTotal: "40.00", status: "Cancelado",  qrCode: "QR-6"  } });
  const pedido7  = await prisma.pedido.create({ data: { precoTotal: "42.00", status: "Pendente",  qrCode: "QR-7"  } });
  const pedido8  = await prisma.pedido.create({ data: { precoTotal: "44.00", status: "Confirmado", qrCode: "QR-8"  } });
  const pedido9  = await prisma.pedido.create({ data: { precoTotal: "46.00", status: "Cancelado",  qrCode: "QR-9"  } });
  const pedido10 = await prisma.pedido.create({ data: { precoTotal: "48.00", status: "Pendente",  qrCode: "QR-10" } });

  // 10 REGISTRO_PEDIDO (5 com filme, 5 com alimento)
  await prisma.registroPedido.create({ data: { pedidoId: pedido1.id,  filmeId: filme1.id  } });
  await prisma.registroPedido.create({ data: { pedidoId: pedido2.id,  filmeId: filme2.id  } });
  await prisma.registroPedido.create({ data: { pedidoId: pedido3.id,  filmeId: filme3.id  } });
  await prisma.registroPedido.create({ data: { pedidoId: pedido4.id,  filmeId: filme4.id  } });
  await prisma.registroPedido.create({ data: { pedidoId: pedido5.id,  filmeId: filme5.id  } });
  await prisma.registroPedido.create({ data: { pedidoId: pedido6.id,  alimentoId: alimento1.id } });
  await prisma.registroPedido.create({ data: { pedidoId: pedido7.id,  alimentoId: alimento2.id } });
  await prisma.registroPedido.create({ data: { pedidoId: pedido8.id,  alimentoId: alimento3.id } });
  await prisma.registroPedido.create({ data: { pedidoId: pedido9.id,  alimentoId: alimento4.id } });
  await prisma.registroPedido.create({ data: { pedidoId: pedido10.id, alimentoId: alimento5.id } });

  console.log("✅ Seed simples criado com 10 registros por tabela.");
}

try {
  await main();
} catch (e) {
  console.error("❌ Erro no seed:", e);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}