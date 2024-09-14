import type { NextApiRequest, NextApiResponse } from 'next';
import { controleLivro } from '.';

export default (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'DELETE') {
            const codigo = parseInt(req.query.codigo as string);
            controleLivro.excluir(codigo);
            res.status(200).json({ mensagem: 'Livro excluído com sucesso' });
        } else {
            res.status(405).json({ mensagem: 'Método não permitido' });
        }
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};
