const { Client } = require('pg');

const supabaseUrl = 'https://lbqwaizqehhsbgpcplhp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxicXdhaXpxZWhoc2JncGNwbGhwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NDU0NDQyNywiZXhwIjoyMDEwMTIwNDI3fQ._ftVKRBohhqiXWbyM8_wAyqckcc3jFLTnvDUBEG6WjE';

const connection = new Client({
  connectionString: `${supabaseUrl}?apikey=${supabaseKey}`,
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão com o banco de dados Supabase estabelecida com sucesso.');

    // Agora você pode executar comandos SQL aqui
  }
});


module.exports = connection;