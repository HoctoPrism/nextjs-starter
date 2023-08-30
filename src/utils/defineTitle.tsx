const defineTitle = (props: string) => {
  if (typeof window !== 'undefined' && props) {
    document.title = props;
  }
};

export default defineTitle;
