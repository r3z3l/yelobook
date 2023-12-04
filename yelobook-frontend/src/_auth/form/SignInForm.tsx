import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInFormSchema } from "@/lib/validation";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";



const SignInForm = () => {
  console.log("hi")
  const navigate = useNavigate();

  const { mutateAsync: signInUser, isPending} = useSignInAccount();
  const { checkAuthUser, isPending: isUserPending } = useUserContext();

  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  async function onSubmit(values: z.infer<typeof SignInFormSchema>) {
    const newUser = await signInUser(values);
    if(!newUser){
      // TODO: add Toast
      return "signin failed";
    }
    localStorage.setItem("token", newUser.token);
    const isLoggedIn = await checkAuthUser();
    console.log(isLoggedIn)
    if(isLoggedIn){
      form.reset();
      navigate("/");
    }
    //TODO: add Toast
    useNavigate //return console.log('signin failed')
  }


  return (
    <Form {...form}>
      <div className="sm:w-240 flex flex-center flex-col">
        <h1 className="text-3xl font-bold mb-4">Yelo Book</h1>
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          SignIn to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back! Please enter your details
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isPending ? "Loading..." : "Sign In"}
          </Button>
        </form>
        <p className="text-small-regular text-light-2 text-center mt-2">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-primary-500 text-small-semibold ml-1"
          >
            SignUp
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default SignInForm;
