import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { pool } from "../signUp/page";

import { redirect } from "next/navigation";

export async function executeQuery(query: string) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(query);
    console.log("query executed successfully");
    return rows;
  } catch (error) {
    console.log("Error executing query: ", error);
    return null;
  } finally {
    if (connection) connection.release();
  }
}
async function checkcredentials(data: FormData) {
  "use server";
  const userEmail = data.get("user-email");
  const userPassword = data.get("user-password");
  interface RowDataPacket {
    username: string;
    email: string;
    name: string;
    contactNo: number;
    password: string;
  }
   
    const usersData = (await executeQuery(
      "select * from users"
    )) as RowDataPacket[];
    if (usersData) {
      const matchedUser = usersData.find((row: RowDataPacket) => {
        return (userEmail === row.email && userPassword === row.password);
      });
      if (matchedUser) {
        console.log("Successful login");
        redirect("/");
      } else {
        console.log("Error in login");
        redirect("/login");
      }
    } else {
      console.log("Error in data fetching");
    }
 
}
export default function LogIn() {
  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 border-b mb-6 bg-blue-400">
        <div className="flex items-center justify-center max-w-4xl mx-auto">
          <Link
            className="flex items-center space-x-2 text-white text-2xl font-bold"
            href="/"
          >
            School
          </Link>
        </div>
      </header>
      <Card className="mx-auto w-full max-w-sm space-y-4 bg-blue-300">
        <CardHeader className="space-y-2 text-center">
          {/* <Image src="https://cdn-icons-png.freepik.com/256/2889/2889676.png" alt="" width={40} height={40}/> */}
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </div>
        </CardHeader>
        <form action={checkcredentials}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="user-email"
                placeholder="m@example.com"
                required
                type="email"
                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                title="Please fill right email for log in"
              
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="pass" name="user-password" required type="password"   title="Please fill right password for log in"/>
            </div>
          </CardContent>
          <CardFooter className="space-y-4">
            <Button className="w-full" type="submit">Sign in</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
