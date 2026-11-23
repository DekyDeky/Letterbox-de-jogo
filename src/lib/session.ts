import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(
    process.env.AUTH_SECRET!
);

export async function criarToken(id: number, username: string) {

    console.log(id)

    return await new SignJWT({
        username : username
    })
        .setProtectedHeader({ alg: "HS256" })
        .setSubject(String(id))
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(secret);
}

export async function verificarToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, secret);

        if (
            !payload.sub || typeof payload.username !== "string"
        ) {
            return null
        }
 
        return {
            id: Number(payload.sub),
            username: payload.username
        };

    } catch {
        return null;
    }
}