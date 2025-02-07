import React from 'react';
import { Container, Typography, Box, Button, Divider, Link } from '@mui/material';

const CookiePolicy = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Política de Cookies
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          1. Introdução
        </Typography>
        <Typography variant="body1" paragraph>
          Esta Política de Cookies explica como utilizamos cookies e tecnologias semelhantes em nosso site. Ao acessar e utilizar nosso site, você concorda com o uso de cookies conforme descrito nesta política.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          2. O que são Cookies?
        </Typography>
        <Typography variant="body1" paragraph>
          Cookies são pequenos arquivos de texto armazenados no dispositivo do usuário para coletar informações padrão de registro na internet e informações de comportamento dos visitantes. Eles permitem que nossos sistemas reconheçam seu dispositivo e melhorem sua experiência de navegação.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          3. Tipos de Cookies que Utilizamos
        </Typography>
        <ul>
          <li><strong>Cookies Necessários:</strong> Essenciais para o funcionamento do site e não podem ser desativados.</li>
          <li><strong>Cookies de Desempenho:</strong> Coletam informações sobre como os usuários interagem com o site para melhorar sua funcionalidade.</li>
          <li><strong>Cookies Funcionais:</strong> Permitem personalizar a experiência do usuário com base em suas preferências.</li>
          <li><strong>Cookies de Publicidade:</strong> Utilizados para fornecer anúncios relevantes aos interesses do usuário.</li>
        </ul>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          4. Gerenciamento de Cookies
        </Typography>
        <Typography variant="body1" paragraph>
          O usuário pode configurar seu navegador para bloquear ou alertar sobre cookies. No entanto, ao desativar certos cookies, partes do site podem não funcionar corretamente.
        </Typography>
        <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
          Gerenciar Preferências de Cookies
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          5. Direitos e Consentimento
        </Typography>
        <Typography variant="body1" paragraph>
          Ao continuar utilizando este site, você consente com o uso de cookies conforme descrito nesta política. Reservamo-nos o direito de atualizar esta política a qualquer momento, e é sua responsabilidade revisá-la periodicamente.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          6. Contato
        </Typography>
        <Typography variant="body1" paragraph>
          Em caso de dúvidas sobre esta Política de Cookies, entre em contato conosco através do e-mail: <Link href={"mailto:" + process.env.EMAIL_SUPPORT}>{process.env.EMAIL_SUPPORT}</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default CookiePolicy;
