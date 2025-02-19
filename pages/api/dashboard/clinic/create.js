import dbConnect from "../../../../db/mongodb";
import Clinic from "../../../../db/models/clinic";
import { formatBadRequest } from "@/util/api";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(405).json("Method Not Allowed");
      break;
    case "POST":
      try {
        const item = await Clinic.create(req.body);
        res.status(201).json({ success: true, data: item });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, error: formatBadRequest(error) });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
