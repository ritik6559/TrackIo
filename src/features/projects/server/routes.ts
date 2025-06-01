import {Hono} from "hono";
import {sessionMiddleWare} from "@/lib/session-middleware";
import {zValidator} from "@hono/zod-validator";
import {getMember} from "@/features/members/utils";
import {DATABASE_ID, PROJECTS_ID} from "@/config";
import {Query} from "node-appwrite";
import {z} from "zod";

const app = new Hono()
    .get(
        "/",
        sessionMiddleWare,
        zValidator("query", z.object({ workspaceId: z.string() })),
        async (c) => {
            const user = c.get("user");
            const databases = c.get("databases");

            const { workspaceId } = c.req.valid("query");

            const member = await getMember({
                databases,
                workspaceId,
                userId: user.$id
            });

            if(!member){
                return c.json({
                    error: "Unauthorized",
                }, 401);
            }

            const projects = await databases.listDocuments(
                DATABASE_ID,
                PROJECTS_ID,
                [
                    Query.equal('workspaceId', workspaceId),
                    Query.orderAsc("$createdAt")
                ]
            );

            return c.json({
                data: projects
            });

        }
    )


export default app
