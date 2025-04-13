import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import DottedSeparator from "@/components/dotted-separator";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormMessage, FormItem} from "@/components/ui/form";


const formSchema = z.object({
    name: z.string().trim().min(1, "Required"),
    email: z.string().email(),
    password: z.string().min(8, "Minimum 8 characters required."),
})

const SignUpCard = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log("values", values);
    }

    return (
        <Card
            className= {"w-full h-full md:w-[487px] border-none shadow-none"}
        >
            <CardHeader
                className={"flex flex-col items-center justify-center text-center p-7"}
            >
                <CardTitle
                    className={"text-2xl"}
                >
                    Sign Up
                </CardTitle>
                <CardDescription>
                    By signing up you agree to our{" "}
                    <Link
                        href={"/privacy"}
                    >
                        <span className={"text-blue-700"} >Privacy Policy</span>
                    </Link>{" "}
                    and{" "}
                    <Link
                        href={"/privacy"}
                    >
                        <span className={"text-blue-700"} >Terms of Services</span>
                    </Link>
                </CardDescription>
            </CardHeader>
            <div
                className={"px-7"}
            >
                <DottedSeparator/>
            </div>
            <CardContent
                className={"pX-7"}
            >
                <Form
                    {...form}
                >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={"space-y-4"}
                >
                    <FormField
                        name={"name"}
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder={"Enter name"}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                    )}
                    />

                    <FormField
                        name={"email"}
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder={"Enter email address"}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}
                    />

                    <FormField
                        name={"password"}
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                        placeholder={"Enter password"}
                                        min={8}
                                        max={256}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}
                    />

                    <Button
                        disabled={false}
                        size={"lg"}
                        className={"w-full"}
                    >
                        Log In
                    </Button>
                </form>
                </Form>
            </CardContent>
            <div
                className={"px-7"}
            >
                <DottedSeparator/>
            </div>
            <CardContent
                className={"p-7 flex flex-col gap-y-4"}
            >
                <Button
                    disabled={false}
                    variant={"secondary"}
                    size={"lg"}
                    className={"w-full"}
                >
                    <FcGoogle className={"mr-2 size-5"} />
                    Login with Google
                </Button>
                <Button
                    disabled={false}
                    variant={"secondary"}
                    size={"lg"}
                    className={"w-full"}
                >
                    <FaGithub className={"mr-2 size-5"} />
                    Login with Github
                </Button>
            </CardContent>
        </Card>
    );
};

export default SignUpCard;
