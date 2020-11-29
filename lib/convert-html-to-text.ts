export const useConvertHtmlToText = (html) => {
    html = html.replace(/<style([\s\S]*?)<\/style>/gi, '');
    html = html.replace(/<script([\s\S]*?)<\/script>/gi, '');
    html = html.replace(/<\/div>/ig, '');
    html = html.replace(/<\/li>/ig, '');
    html = html.replace(/<li>/ig, '');
    html = html.replace(/<\/ul>/ig, '');
    html = html.replace(/<\/p>/ig, '');
    html = html.replace(/<br\s*[\/]?>/gi, '');
    html = html.replace(/<[^>]+>/ig, '');
    html = html.replace(/&lt;br&gt;/g,"");
    return html;
}