import React from 'react';
import { Container, Typography, Box, Link, Divider } from '@mui/material';

const TermsOfUse = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Termos de Uso
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          1. Aceitação dos Termos
        </Typography>
        <Typography paragraph>
          Ao utilizar nosso serviço de encurtamento de links, você concorda com os Termos e Condições aqui descritos. Caso discorde de qualquer condição, solicitamos que não utilize nossa plataforma.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          2. Alteração de Termos
        </Typography>
        <Typography paragraph>
          Reservamo-nos o direito de modificar os Termos de Uso a qualquer momento, com publicação prévia no site. O uso contínuo do serviço após alterações implica aceitação das novas condições.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          3. Uso Permitido
        </Typography>
        <Typography paragraph>
          O serviço deve ser utilizado exclusivamente para fins legais. É proibido o uso para encurtar links que direcionem para conteúdos ilícitos, fraudulentos, ofensivos ou que infrinjam direitos de terceiros.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          4. Limitação de Responsabilidade
        </Typography>
        <Typography paragraph>
          Não nos responsabilizamos por qualquer dano, perda ou prejuízo decorrente do uso dos links encurtados, incluindo conteúdos de terceiros acessados por meio deles.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          5. Remoção de Links
        </Typography>
        <Typography paragraph>
          Reservamo-nos o direito de remover links que violem nossos Termos de Uso ou que sejam denunciados por uso inadequado.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          6. Propriedade Intelectual
        </Typography>
        <Typography paragraph>
          O serviço e seus componentes são de propriedade da empresa, sendo proibida sua cópia, modificação ou distribuição sem autorização.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          7. Privacidade e Dados
        </Typography>
        <Typography paragraph>
          Os dados coletados são tratados conforme a nossa{' '}
          <Link href="/privacy-policy" underline="hover">
            Política de Privacidade
          </Link>, respeitando a legislação vigente.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          8. Lei Aplicável e Foro
        </Typography>
        <Typography paragraph>
          Estes termos são regidos pela legislação brasileira. Em caso de disputa, o foro da comarca da sede da empresa será eleito.
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsOfUse;
