'use client'
import { Title } from "rizzui";
import appwriteService, { account } from "../appwrite";



export default function Home() {

  const getCurrentUser = async  () => {
    try {
        appwriteService.createDocument({
          "plan_name": "ENTERPRISE",
          "plan_base_price": 3999,
          "plan_discount": 20,
          "plan_price": 3299,
          "validity": 30,
          "status": true,
        })
    } catch (error) {
        console.log("error: " + error)
    }
}
  return (
    <>
      <Title>Start Building your App</Title>
      {/* <Loading /> */}

      <button type="button" onClick={() => getCurrentUser()}>
        Dashboard
      </button>
      <button type="button">
        Dashboard
      </button>
    </>
  );
}
