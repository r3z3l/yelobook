import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpFormSchema } from "@/lib/validation";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUser } from "@/lib/react-query/queriesAndMutation";


const SignUpForm = () => {
  const navigate = useNavigate();

  const { mutateAsync: createUserAccount, isPending} = useCreateUser();
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });


  async function onSubmit(values: z.infer<typeof SignUpFormSchema>) {
    const newUser = await createUserAccount(values);

    if(!newUser){
      // TODO: add Toast
      return "signup failed";
    }
    navigate("/signin");
  }


  return (
    <Form {...form}>
      <div className="sm:w-240 flex flex-center flex-col">
        <h1 className="text-3xl font-bold mb-4">Yelo Book</h1>
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use Yelo Book, please enter your details
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
            {isPending ? "Loading..." : "Sign up"}
          </Button>
        </form>
        <p className="text-small-regular text-light-2 text-center mt-2">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-primary-500 text-small-semibold ml-1"
          >
            SignIn
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default SignUpForm;
