import clinic from "@/db/models/clinic";
import dbConnect from "@/db/mongodb";
import { formatBadRequest } from "@/util/api";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case "POST":
      res.status(405).json("Method Not Allowed");
      break;
    case "GET":
      try {
        const clinics = await clinic.find();
        res.status(201).json({ success: true, data: clinics[0] });
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
