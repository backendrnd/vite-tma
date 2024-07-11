export const copyToClipboard = (string) => {
    let clipboard = document.createElement('input');
    document.body.appendChild(clipboard);
    clipboard.value = string;
    clipboard.select();
    // noinspection JSDeprecatedSymbols
    document.execCommand('copy'); // NOSONAR
    document.body.removeChild(clipboard);
};
