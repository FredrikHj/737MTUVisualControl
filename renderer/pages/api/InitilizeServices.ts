import type { NextApiRequest, NextApiResponse } from 'next'
import generalTexts from '../../data/GeneralTexts'; 
import { initializeStore } from "../../store"; 
import serviceServerConfig from "../../data/serviceServerConfig";
import { setServicesConnected } from "../../redux/ThrottleReadySlicer";
import { setConnected, setConBottonShowable, setLabelConButton, setStateName, setErrorOccured, setConnectionInfo  } from '../../redux/PhidgetsSlicer';

type ResponseData = {
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  res.status(200).json({ message: 'Hello from Next.js!' })
}
