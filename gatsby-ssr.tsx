export const onRenderBody = ({ setHtmlAttributes, pathname }) => {
  setHtmlAttributes({
    lang: pathname?.startsWith('/ru/') ? 'ru' : pathname?.startsWith('/uk/') ? 'uk' : 'en'
  })
}
