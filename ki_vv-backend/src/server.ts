import cors from "cors";
import express, { Router } from "express";
import { prisma } from "./db";

// Server Instance
const server = express();

// Middlewares
server.use(cors());
server.use(express.json());

// Routes
const apiRoute = Router();

apiRoute.get("/symbols", async (_req, res) => {
	const items = await prisma.currency.findMany({ select: { code: true } });
	const result = items.map((item) => item.code);
	res.json(result);
});

apiRoute.get("/convert", async (_req, res) => {
	const query = _req.query;

	const from = query.from as string;
	const to = query.to as string;
	const amount = Number(query.amount);

	const rate = await prisma.currencyRate.findFirst({
		where: {
			pair: {
				from: { code: from },
				to: { code: to },
				OR: {
					from: { code: to },
					to: { code: from },
				},
			},
		},
		include: {
			pair: {
				include: {
					from: true,
					to: true,
					rate: true,
				},
			},
		},
	});

	if (rate) {
		let result = 0;

		if (rate.pair.from.code === from) {
			result = amount / rate.rate;
		} else {
			result = amount * rate.rate;
		}

		res.send(amount);
	} else {
		res.status(401).json(null);
	}
});

apiRoute.post("/change-rate", (_req, res) => res.json(null));

// Add Routes
server.use("/api", apiRoute);

// Export
export default server;
