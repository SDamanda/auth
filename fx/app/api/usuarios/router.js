import { createClient } from "@supabase/supabase-js";

const supabaseUrl = NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request) {
    try {
        const { email, senha, nome, numero } = await request.json();

        const { data, error } = await supabase.auth.signUp({
            email,
            password: senha,
            options: {
                data: { nome, numero }
            }
        });
        if (error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 400 });

        }
        return new Response(JSON.stringify(data), { status: 201 });
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Erro ao processar requisição' }), { status: 500 });
    }
}
