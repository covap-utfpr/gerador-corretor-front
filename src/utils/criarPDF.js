import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { obterNomeDisciplina } from '../storage/disciplinasStorage';

function criarPDF( listaDisciplinas, avaliacao ) {

    const disciplina = obterNomeDisciplina(listaDisciplinas, avaliacao.cabecalho.disciplina);

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    // Conteúdo do documento
    var docDefinition = {

        pageMargins: [ 40, 60, 40, 60 ],
        
        defaultStyle: {
            fontSize: avaliacao.configuracoes.tamanhoFonte,
            // font: avaliacao.configuracoes.fonte
        },

        styles: {
            header: {
                alignment: 'center',
                bold: true,
            },
        },

        content: [
            { text: avaliacao.cabecalho.instituicao, style: 'header' },
            { text: avaliacao.cabecalho.titulo, style: 'header' },
            { text: "Disciplina: " + disciplina, style: 'header' },
            { text: "Nome: _________________________", style: 'header'},
            { text: avaliacao.cabecalho.data, style: 'header' },
            {
                columns: [
                    {
                        // auto-sized columns have their widths based on their content
                        width: '50%',
                        text: 'First column'
                    },
                    {
                        // auto-sized columns have their widths based on their content
                        width: '50%',
                        text: 'Second column'
                    },
                ]
            }
        ],
    };

    // Cria o PDF
    pdfMake.createPdf(docDefinition).open();
}

export default criarPDF;