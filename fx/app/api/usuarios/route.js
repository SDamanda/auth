import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('SUPABASE_URL:', supabaseUrl);
console.log('ANON_KEY:', supabaseAnonKey);
console.log('SERVICE_ROLE_KEY:', supabaseServiceRoleKey);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request) {
    try {
        const { email, senha, nome, numero } = await request.json();

        if (!email || !senha) {
            return new Response(
                JSON.stringify({ error: 'Email e senha são obrigatórios.' }),
                { status: 400 }
            );
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password: senha,
            options: { data: { nome, numero } }
        });

        if (error) {
            console.error("Erro Supabase signup:", error);
            return new Response(JSON.stringify({ error: error.message }), { status: 400 });
        }

        return new Response(JSON.stringify(data), { status: 201 });

    } catch (err) {
        console.error("Erro na API POST /usuarios:", err);
        return new Response(
            JSON.stringify({ error: 'Erro ao processar requisição', details: err.message }),
            { status: 500 }
        );
    }
}
