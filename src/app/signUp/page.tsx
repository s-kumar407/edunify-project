
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import mysql from 'mysql2/promise';
export const pool = mysql.createPool({
  // host:process.env.MYSQL_HOST,
  // user:process.env.MYSQL_USER,
  // password: process.env.MYSQL_PASSWORD,
  // database:process.env.MYSQL_DATABASE,
  host:'127.0.0.1',
  user:'root',
  password:'root',
  database:'school',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


 
async function sendUserData(data: FormData) {
  "use server";
  const username=data.get("username");
  const email=data.get("email");
  const name=data.get("name");
  const contactNo=data.get("phone-number");
  const password=data.get("password");
  const dbconnection=await checkConnection();

  if( dbconnection)
  {
    const postQuery="insert into users(username,email,name,contactNo,password) values(?,?,?,?,?)";
    const result=await executeQuery(postQuery,[username,email,name,contactNo,password]);
    console.log(result);
    redirect("/addschool");

  }else{
     console.log("connection fail to database");
  }
  
}

export async function checkConnection() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('Connection to the database is established.');
    return true;
  } catch (error) {
    console.log('Error connecting to the database: ', error);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

 export async function executeQuery(query:string, values:any[]) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows, fields] = await connection.query(query, values);
    return rows;
  } catch (error) {
    console.log('Error executing query: ', error);
    return null;
  } finally {
    if (connection) connection.release();
  }
}


export default async function SignUp() {
 

  return (
    <>
      <div className="flex flex-col h-screen">
        <header className="p-4 border-b bg-blue-400">
          <div className="flex items-center justify-center max-w-4xl mx-auto">
            <Link
              className="flex items-center space-x-2 text-3xl text-white font-bold"
              href="/"
            >
              School
            </Link>
          </div>
        </header>
        <main className="flex-1 bg-gray-100 dark:bg-gray-900 py-6">
          <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
            <div className="grid gap-4 p-4 rounded-lg bg-blue-300 shadow-lg max-w-sm w-full dark:bg-gray-900">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold text-black py-2">Signup</h1>
                <p className=" text-slate-500 font-bold">
                  If you want to add a school First create an account{" "}
                </p>
              </div>
              <div className="space-y-4">
                <form action={sendUserData}>
                  <div className="py-2">
                    <label className="text-slate-600 font-bold">Username</label>
                    <Input
                      name="username"
                      placeholder="Enter your username"
                      type="text"
                      required
                    />
                  </div>

                  <div className="py-2">
                    <label className="text-slate-600 font-bold">Email</label>
                    <Input
                      name="email"
                      placeholder="Enter your email"
                      type="email"
                      pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                      title="write valid email"
                      required
                    />
                  </div>
                  <div className="py-2">
                    <label className="text-slate-600 font-bold">Name</label>
                    <Input
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      pattern="^[a-zA-z]+([\s][a-zA-Z]+)*$"
                      required
                    />
                  </div>
                  <div className="py-2">
                    <label className="text-slate-600 font-bold">
                      Phone Number
                    </label>
                    <Input
                      name="phone-number"
                      type="number"
                      placeholder="Enter your phone number"
                      pattern="([0-9]{11}$)|(^[7-9][0-9]{9}$)"
                      title="fill right contact number"
                      required
                    />
                  </div>
                  <div className="py-2">
                    <label className="text-slate-600 font-bold">Password</label>
                    <Input
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      pattern=".{8,}" 
                      title="Eight or more characters"
                      required
                    />
                  </div>
                  <Button className="w-full mt-3" type="submit">
                    Sign Up
                  </Button>
                </form>
                {/* <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password"  type="password" required />
              </div> */}
              </div>
              <div className="text-center">
                <p>Already Have an account?</p>
                <Link className="font-medium" href="/login">
                  <span className="text-slate-800 font-bold text-lg">
                    Login
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <footer className="border-t p-4 bg-blue-400 ">
          <div className="max-w-4xl mx-auto text-center font-bold  text-sm text-slate-600 dark:text-gray-400">
            © 2023 School. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
