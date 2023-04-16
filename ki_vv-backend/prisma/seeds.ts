import { prisma } from "../src/db";

async function main() {
	// Default Currencies
	const EUR = await prisma.currency.create({ data: { code: "EUR" } });
	const HUF = await prisma.currency.create({ data: { code: "HUF" } });

	// Default Rates
	const rate = await prisma.currencyRate.create({
		data: {
			rate: 400,
			pair: {
				create: {
					fromId: HUF.id,
					toId: EUR.id,
				},
			},
		},
	});
}

main();
