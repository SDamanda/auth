import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
    'https://vtxkcychklqsxtlospft.supabase.co'
const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0eGtjeWNoa2xxc3h0bG9zcGZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwMjY5NTgsImV4cCI6MjA3MjYwMjk1OH0'

const supabase = createClient(supabaseUrl, supabaseKey);

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
