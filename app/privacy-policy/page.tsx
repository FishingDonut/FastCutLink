import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Política de Privacidade
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          1. Introdução
        </Typography>
        <Typography paragraph>
          Esta Política de Privacidade descreve como coletamos, usamos e protegemos os dados fornecidos pelos usuários ao utilizar nossos serviços. Ao utilizar este site, você concorda com os termos descritos aqui.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          2. Coleta de Dados
        </Typography>
        <Typography paragraph>
          <strong>Dados coletados automaticamente:</strong> Informações sobre o dispositivo, navegador, endereço IP e comportamento de navegação.
        </Typography>
        <Typography paragraph>
          <strong>Dados fornecidos pelo usuário:</strong> Informações inseridas em formulários, como nome, e-mail e dados de pagamento.
        </Typography>
        <Typography paragraph>
          <strong>Uso de cookies:</strong> Utilizamos cookies para melhorar a experiência do usuário e realizar análises de uso.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          3. Uso dos Dados
        </Typography>
        <Typography paragraph>
          Os dados coletados podem ser utilizados para:
        </Typography>
        <ul>
          <li>Personalizar a experiência do usuário.</li>
          <li>Processar transações e prestar suporte ao cliente.</li>
          <li>Realizar melhorias no sistema e detectar problemas técnicos.</li>
          <li>Cumprir obrigações legais e regulatórias.</li>
        </ul>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          4. Compartilhamento de Dados
        </Typography>
        <Typography paragraph>
          Seus dados não serão vendidos a terceiros. Contudo, podem ser compartilhados nas seguintes situações:
        </Typography>
        <ul>
          <li>Com prestadores de serviços que auxiliam na operação do sistema (por exemplo, serviços de hospedagem ou provedores de pagamento).</li>
          <li>Quando exigido por lei, ordem judicial ou solicitação de autoridade competente.</li>
        </ul>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          5. Direitos do Usuário
        </Typography>
        <Typography paragraph>
          O usuário possui os seguintes direitos, conforme a legislação aplicável:
        </Typography>
        <ul>
          <li>Solicitar acesso, correção ou exclusão de seus dados pessoais.</li>
          <li>Revogar o consentimento para o tratamento de dados, quando aplicável.</li>
          <li>Solicitar a portabilidade de dados, se tecnicamente viável.</li>
        </ul>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          6. Limitação de Responsabilidade
        </Typography>
        <Typography paragraph>
          Não nos responsabilizamos por falhas decorrentes de ataques cibernéticos fora do nosso controle, desde que as medidas de segurança adequadas tenham sido implementadas.
        </Typography>
        <Typography paragraph>
          Não garantimos a inviolabilidade dos dados, mas seguimos práticas recomendadas de segurança para minimizar riscos.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          7. Segurança dos Dados
        </Typography>
        <Typography paragraph>
          Utilizamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, perda ou alteração.
        </Typography>
        <Typography paragraph>
          No entanto, o usuário é responsável por manter suas credenciais seguras e não compartilhar informações confidenciais em ambientes inseguros.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          8. Alterações nesta Política
        </Typography>
        <Typography paragraph>
          Reservamo-nos o direito de atualizar esta política a qualquer momento. As alterações entrarão em vigor na data de sua publicação.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          9. Foro e Lei Aplicável
        </Typography>
        <Typography paragraph>
          Esta Política de Privacidade é regida pelas leis brasileiras. Em caso de disputa, o foro da comarca da sede da empresa será o competente.
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
