'use client'
import { Title } from "rizzui";
import appwriteService, { account } from "../appwrite";



export default function Home() {

  const getCurrentUser = async () => {
    const data = await appwriteService.getCurrentUser()
    if (data) {
      console.log(data.prefs.validity)
    }
  }

  const profileImage = async () => {
    const data = await appwriteService.updatePrefs({
      payment_pages: '40',
      validity: '2024-07-26T08:43:21.224+00:00',
      KYC: true,
    })
  }

  return (
    <>
      <Title>Start Building your App - { }</Title>
      {/* <Loading /> */}

      <button type="button" onClick={() => getCurrentUser()}>
        Dashboard
      </button>
      <button type="button" onClick={() => profileImage()}>
        Dashboard
      </button>
    </>
  );
}
