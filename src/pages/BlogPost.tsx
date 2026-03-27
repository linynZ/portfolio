import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { useState, useEffect } from 'react';
import { blogPosts } from '../content/blog/index.ts';

const blogModulesEn = import.meta.glob('../content/blog/en/*.md', { query: '?raw', import: 'default' });
const blogModulesZh = import.meta.glob('../content/blog/zh/*.md', { query: '?raw', import: 'default' });

function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    async function loadContent() {
      setLoading(true);
      const modules = isZh ? blogModulesZh : blogModulesEn;
      const key = `../content/blog/${isZh ? 'zh' : 'en'}/${slug}.md`;
      const loader = modules[key];
      if (loader) {
        const raw = await loader();
        setContent(raw as string);
      } else {
        setContent('# Article not found');
      }
      setLoading(false);
    }
    loadContent();
  }, [slug, isZh]);

  if (!post) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link to="/blog" className="text-accent hover:underline">
          {t('blog.backToList')}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link
          to="/blog"
          className="inline-flex items-center gap-1 text-text-secondary hover:text-accent mb-8 transition-colors"
        >
          <span>&#8592;</span> {t('blog.backToList')}
        </Link>

        {loading ? (
          <div className="text-center py-20 text-text-secondary">Loading...</div>
        ) : (
          <article className="prose prose-lg max-w-none prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-accent prose-strong:text-text-primary prose-code:text-accent prose-code:bg-bg-card prose-code:px-1 prose-code:rounded prose-pre:bg-bg-dark prose-pre:text-gray prose-th:text-text-primary prose-td:text-text-secondary">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
              {content}
            </ReactMarkdown>
          </article>
        )}
      </motion.div>
    </div>
  );
}

export default BlogPost;
