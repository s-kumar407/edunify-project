import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import fs from "fs";
import path from "path";
import { writeFile } from "fs/promises";
import { join } from "path";


import mysql from "mysql2/promise";

const pool = mysql.createPool({
  // host:process.env.MYSQL_HOST ,
  // user: process.env.MYSQL_USER,
  // password:process.env.MYSQL_PASSWORD,
  // database:process.env. MYSQL_DATABASE,
  host:'127.0.0.1',
  user:'root',
  password:'root',
  database:'school',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


async function checkConnection() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log("Connection to the database is established.");
    return true;
  } catch (error) {
    console.log("Error connecting to the database: ", error);
    return false;
  } finally {
    if (connection) connection.release();
  }
}


async function executeQuery(query: string, values: any[]) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows, fields] = await connection.query(query, values);
    return rows;
  } catch (error) {
    console.log("Error executing query: ", error);
    return null;
  } finally {
    if (connection) connection.release();
  }
}

async function addSchoolDetails(data: FormData) {
  "use server";
  const schoolName = data.get("school-name");
  const address = data.get("address");
  const city = data.get("city");
  const state = data.get("state");
  const contactNumber = data.get("contact-number");
  const schoolEmail = data.get("email");
  const schoolImage = data.get("image") as File;
  console.log(schoolImage.name);
  console.log(schoolImage.size);
  console.log(schoolImage.type);
  const imageInfo = {
    name: schoolImage.name,
    size: schoolImage.size,
    type: schoolImage.type,
    imagePath: "public/schoolImages",
  };
  const image = JSON.stringify(imageInfo);
  console.log(image);
  const bytes = await schoolImage.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const path = join(process.cwd(), "public/schoolImages", schoolImage.name);
  await writeFile(path, buffer);

  const dbconnection = await checkConnection();
  if (dbconnection) {
    const postQuery =
      "insert into schools(name,address,city,state,contact,image,email_id) values(?,?,?,?,?,?,?)";
    const result = await executeQuery(postQuery, [
      schoolName,
      address,
      city,
      state,
      contactNumber,
      image,
      schoolEmail,
    ]);
    console.log(result);
    redirect("/addschool");
  } else {
    console.log("connection fail to database");
  }
}
export default function AddSchool() {
  return (
    <div className="">
      <header className="p-4 border-b mb-6 w-full bg-blue-500">
        <div className="flex items-center justify-center max-w-4xl mx-auto">
          <Link
            className="flex items-center space-x-2 text-2xl font-bold text-white"
            href="/"
          >
            School
          </Link>
        </div>
      </header>

      <div className=" flex flex-col  items-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Add a new school</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter the school's information below.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 ">
          <form action={addSchoolDetails}>
            <div className="my-1">
              <Label htmlFor="school-name">School name</Label>
              <Input
                name="school-name"
                type="text"
                placeholder="Enter the school name"
                title="Enter the correct School Name"
                pattern="^[a-zA-z]+([\s][a-zA-Z]+)*$"
                required
              />
            </div>
            <div className="my-1">
              <Label htmlFor="address">Address</Label>
              <Input
                name="address"
                type="text"
                placeholder="Enter the address"
                // pattern="\d{1,5}\s\w. \s(\b\w*\b\s){1,2}\w*\"
                title="Enter right Address"
                required
              />
            </div>
            <div className="my-1">
              <Label htmlFor="city">City</Label>
              <Input
                name="city"
                type="text"
                placeholder="Enter the city"
                title="Enter the correct School City"
                pattern="^[a-zA-z]+([\s][a-zA-Z]+)*$"
                required
              />
            </div>
            <div className="my-1">
              <Label htmlFor="state">State</Label>
              <Input
                name="state"
                type="text"
                placeholder="Enter the state"
                title="Enter the correct School State"
                pattern="^[a-zA-z]+([\s][a-zA-Z]+)*$"
                required
              />
            </div>
            <div className="my-1">
              <Label htmlFor="contact-number">Contact number</Label>
              <Input
                name="contact-number"
                placeholder="Enter the contact number"
                type="number"
                pattern="/(0|91)?[6-9][0-9]{9}/"
                title="fill right contact number"
                required
              />
            </div>
            <div className="my-1">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="Enter the email"
                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                title="write valid email"
                required
              />
            </div>
            <div className="my-1">
              <Label htmlFor="image">Image</Label>
              <Input
                name="image"
                type="file"
                placeholder="Enter the image"
                required
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
            <Button className="w-full mt-3" type="submit">
              Save
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
