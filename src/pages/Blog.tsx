import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { blogPosts } from '../content/blog/index.ts';

function Blog() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl font-bold mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {t('blog.title')}
        </motion.h1>

        <div className="space-y-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="block group bg-bg-card rounded-xl p-6 border border-transparent hover:border-accent transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center gap-3 text-sm text-text-secondary mb-3">
                  <time>{post.date}</time>
                  <span>·</span>
                  <span>{post.readTime} {t('blog.minRead')}</span>
                </div>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                  {isZh ? post.titleZh : post.title}
                </h2>
                <p className="text-text-secondary mb-4">
                  {isZh ? post.descriptionZh : post.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-bg-primary border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
