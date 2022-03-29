import express from "express";
import Container from "typedi";

import SquareMenu from "../services/Square/MenuService";

const menuRouter = express();

menuRouter.get("/categories", async (req, res) => {
	try {
		const menu = Container.get(SquareMenu);

		const list = await menu.getCategories(req.query.storeId as string);

		let obj = {};

		for (let i = 0; i < list.length; i++) {
			const item = list[i];

			//@ts-ignore
			obj[i] = {
				id: item.id,
				name: item.categoryData.name || "null",
			};
		}

		res.json(obj);
	} catch (e) {
		res.send(e);
	}
});

menuRouter.get("/items", async (req, res) => {
	try {
		const menu = Container.get(SquareMenu);

		const list = await menu.getItems(req.query.storeId as string);

		let obj = {};

		for (let i = 0; i < list.length; i++) {
			const item = list[i];

			//@ts-ignore
			obj[i] = {
				id: item.id,
				name: item.itemData.name || "null",
				description: item.itemData.description || "null",
				categoryId: item.itemData.categoryId || "null",
				productType: item.itemData.productType,
				price:
					item.itemData.variations[0].itemVariationData.priceMoney.amount.toString() ||
					"null",
				imageId: item.itemData.imageIds?.[0] || "null",
			} as MenuItem;
		}

		res.json(obj);
	} catch (e) {
		res.send(e);
	}
});

menuRouter.get("/items/:itemId", async (req, res) => {
	try {
		const menu = Container.get(SquareMenu);

		const item = await menu.getItemById(req.params.itemId);

		let itemVariations = {};

		for (let j = 0; j < item.itemData.variations.length; j++) {
			//@ts-ignore
			itemVariations[j] = {
				id: item.itemData.variations[j].id,
				name: item.itemData.variations[j].itemVariationData.name,
				price:
					item.itemData.variations[
						j
					].itemVariationData.priceMoney.amount.toString(),
				ordinal: item.itemData.variations[j].itemVariationData.ordinal,
			} as ItemVariation;
		}

		res.json({
			id: item.id,
			name: item.itemData.name,
			description: item.itemData.description,
			categoryId: item.itemData.categoryId,
			productType: item.itemData.productType,
			variations: itemVariations,
			image: item.imageData.url,
		} as MenuItem);
	} catch (e) {
		res.send(e);
	}
});

menuRouter.get("/items/category/:categoryId", async (req, res) => {
	try {
		const menu = Container.get(SquareMenu);

		const list = await menu.getItemsByCategory(
			req.params.categoryId,
			req.query.storeId as string
		);

		let obj = {};

		for (let i = 0; i < list.items.length; i++) {
			const item = list.items[i];

			//@ts-ignore
			obj[i] = {
				id: item.id,
				name: item.itemData.name || "null",
				description: item.itemData.description || "null",
				categoryId: item.itemData.categoryId || "null",
				price:
					item.itemData.variations[0].itemVariationData.priceMoney.amount.toString() ||
					"null",
				imageId: item.itemData.imageIds?.[0] || "null",
			} as MenuItem;
		}

		res.json(obj);
	} catch (e) {
		res.send(e);
	}
});

export default menuRouter;
