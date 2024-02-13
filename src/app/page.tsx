import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { executeQuery } from "./login/page";
import { checkConnection, pool } from "./signUp/page";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  PromiseLikeOfReactNode,
  ReactPortal,
} from "react";

interface RowDataPacket {
  schoolname: string;
  schooladdress: string;
  schoolcity: string;
  schoolstate: string;
  schoolcontact: number;
  schoolimage: string;
  schoolemail_id: string;
}
let schoolData: RowDataPacket[] = [];

async function fetchSchoolData() {
  const Data = (await executeQuery("select * from schools")) as RowDataPacket[];
  if (Data) {
    console.log(Data);
    schoolData = Data;
    console.log(schoolData);
    console.log(" data fetched successfully");
  } else {
    console.log("Error in data fetching");
  }
}
fetchSchoolData();

export default function showschool() {
  function row(
    value:
      | string
      | number
      | boolean
      | RowDataPacket
      | ReactElement<any, string | JSXElementConstructor<any>>
      | ReactPortal
      | PromiseLikeOfReactNode
      | Iterable<ReactNode>
      | null
      | undefined,
    index: number,
    obj: (
      | string
      | number
      | boolean
      | RowDataPacket
      | ReactElement<any, string | JSXElementConstructor<any>>
      | ReactPortal
      | PromiseLikeOfReactNode
      | Iterable<ReactNode>
      | null
      | undefined
    )[]
  ): value is
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | PromiseLikeOfReactNode
    | null {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <div className="flex flex-col h-screen justify-between">
        <header className="p-4 border-b bg-blue-400 flex ">
          <div className="flex items-center justify-center max-w-4xl mx-auto">
            <div className="flex items-center space-x-2 text-3xl text-white font-bold">
              School
            </div>
          </div>
          <div className="flex ">
            <Link href="/signUp" className="font-bold text-xl text-white">
              Click If You want to add school
            </Link>
            <div className="mx-2 font-bold text-xl">|</div>
            <Link href="/login" className="font-bold text-xl text-white">
              LogIn
            </Link>
          </div>
        </header>
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-16">
              <h1 className="text-4xl font-bold text-center mb-10">
                School Search
              </h1>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Input className="flex-1" placeholder="School Name..." />
                <Button className="w-auto">Search</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div className="flex flex-col items-center bg-white rounded-lg border shadow-md overflow-hidden">
                  <img
                    alt="School Image"
                    className=" h-45 object-cover"
                    height="200"
                    src="/schoolImages/jk logo.jpg"
                    style={{
                      aspectRatio: "200/200",
                      objectFit: "cover",
                    }}
                    width="200"
                  />
                  <div className="p-4">
                    <h5 className="text-lg font-bold">School Name</h5>
                    <p className="text-sm text-gray-500">Address, City</p>
                    <Button className="mt-3 w-full">Apply Now</Button>
                  </div>
                </div>
                <div className="flex flex-col items-center bg-white rounded-lg border shadow-md overflow-hidden">
                  <img
                    alt="School Image"
                    className=" h-45 object-cover"
                    height="200"
                    src="/schoolImages/jk logo.jpg"
                    style={{
                      aspectRatio: "200/200",
                      objectFit: "cover",
                    }}
                    width="200"
                  />
                  <div className="p-4">
                    <h5 className="text-lg font-bold">School Name</h5>
                    <p className="text-sm text-gray-500">Address, City</p>
                    <Button className="mt-3 w-full">Apply Now</Button>
                  </div>
                </div>
                <div className="flex flex-col items-center bg-white rounded-lg border shadow-md overflow-hidden">
                  <img
                    alt="School Image"
                    className=" h-45 object-cover"
                    height="200"
                    src="/schoolImages/jk logo.jpg"
                    style={{
                      aspectRatio: "200/200",
                      objectFit: "cover",
                    }}
                    width="200"
                  />
                  <div className="p-4">
                    <h5 className="text-lg font-bold">School Name</h5>
                    <p className="text-sm text-gray-500">Address, City</p>
                    <Button className="mt-3 w-full">Apply Now</Button>
                  </div>
                </div>
                <div className="flex flex-col items-center bg-white rounded-lg border shadow-md overflow-hidden">
                  <img
                    alt="School Image"
                    className=" h-45 object-cover"
                    height="200"
                    src="/schoolImages/jk logo.jpg"
                    style={{
                      aspectRatio: "200/200",
                      objectFit: "cover",
                    }}
                    width="200"
                  />
                  <div className="p-4">
                    <h5 className="text-lg font-bold">School Name</h5>
                    <p className="text-sm text-gray-500">Address, City</p>
                    <Button className="mt-3 w-full">Apply Now</Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-8">
                <Button className="w-auto">Next</Button>
              </div>
            </div>
          </div>
        </div>
        <footer className="bg-blue-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col">
                <span className="font-bold text-lg mb-2">
                  Subscribe to our Newsletter
                </span>
                <div className="flex">
                  <Input className="flex-1" placeholder="Enter email here..." />
                  <Button className="w-auto">→</Button>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg mb-2">Important Links</span>
                <Link className="block" href="#">
                  Schools in India
                </Link>
                <Link className="block" href="#">
                  Other Schools in India
                </Link>
                <Link className="block" href="#">
                  Colleges in India
                </Link>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg mb-2">Support</span>
                <Link className="block" href="#">
                  Privacy Policy
                </Link>
                <Link className="block" href="#">
                  Terms and Conditions
                </Link>
                <Link className="block" href="#">
                  Refund Policy
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
