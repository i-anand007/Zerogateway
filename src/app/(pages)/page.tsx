'use client'
import { Title } from "rizzui";
import appwriteService, { account } from "../appwrite";



export default function Home() {

  const getCurrentUser = async () => {
    const data = await appwriteService.isAdmin()
    if (data) {
      console.log(data)
    }
  }

  const profileImage = async () => {
    const data = await appwriteService.getCurrentUser(
    )
    console.log(data)
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
