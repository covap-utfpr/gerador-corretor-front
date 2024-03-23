import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

function criarPDF( avaliacao ) {

    console.log(avaliacao)
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    // Definindo estilos personalizados
    var styles = {
        header: {
            fontSize: avaliacao.configuracoes.tamanhoFonte,
            bold: true,
            margin: [0, 0, 0, 0] // Margem inferior de 10 unidades
        },
        paragraph: {
            fontSize: avaliacao.configuracoes.tamanhoFonte,
            margin: [0, 0, 0, 0] // Margem inferior de 10 unidades
        }
    };

    // Conteúdo do documento
    var docDefinition = {
        content: [
            { text: avaliacao.cabecalho.titulo, style: 'header' },
            { text: avaliacao.cabecalho.disciplina, style: 'header' },
            { text: 'Data: ' + avaliacao.cabecalho.data, style: 'header' },
            { text: '' + avaliacao.cabecalho.instituicao, style: 'header' },
            { text: 'Instruçoes: ' + avaliacao.cabecalho.instrucoes, style: 'header' },
            { text: 'questao', style: 'paragraph' },
            { text: 'questao', style: 'paragraph' }
        ],
        styles: styles,
        pageSize: 'A4', // Tamanho da página
        pageMargins: [40, 60, 40, 60], // Margens da página
        columns: [
            { width: '50%', text: 'Conteúdo da coluna 1' },
            { width: '50%', text: 'Conteúdo da coluna 2' }
        ]
    };

    // Cria o PDF
    pdfMake.createPdf(docDefinition).open();
}

export default criarPDF;