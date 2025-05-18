"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"

// This would come from your database in a real app
const posts = [
  {
    id: "1",
    title: "Modern Front-end Architecture Patterns",
    excerpt: "Exploring the latest architecture patterns in front-end development",
    content: `
      # Modern Front-end Architecture Patterns

      Front-end development has evolved significantly over the years, with new architecture patterns emerging to address the growing complexity of web applications. In this article, we'll explore some of the most popular and effective architecture patterns used in modern front-end development.

      ## Component-Based Architecture

      Component-based architecture has become the standard approach for building user interfaces. Frameworks like React, Vue, and Angular all embrace this pattern, which involves breaking down the UI into reusable, self-contained components.

      Benefits of component-based architecture include:
      - **Reusability**: Components can be reused across different parts of the application.
      - **Maintainability**: Each component has a single responsibility, making the codebase easier to maintain.
      - **Testability**: Components can be tested in isolation, simplifying the testing process.
      - **Collaboration**: Different team members can work on different components simultaneously.

      ## Atomic Design

      Atomic Design, introduced by Brad Frost, is a methodology for creating design systems. It breaks down the UI into five distinct levels:

      1. **Atoms**: Basic building blocks like buttons, inputs, and labels.
      2. **Molecules**: Simple groups of UI elements functioning together as a unit.
      3. **Organisms**: Complex UI components composed of molecules and atoms.
      4. **Templates**: Page-level objects that place components into a layout.
      5. **Pages**: Specific instances of templates with real content.

      This approach helps create a systematic way to design and develop interfaces, ensuring consistency and scalability.

      ## JAMstack Architecture

      JAMstack (JavaScript, APIs, and Markup) is an architecture approach that decouples the front-end from the back-end, focusing on pre-rendering and static site generation.

      Key principles of JAMstack include:
      - **Pre-rendering**: Pages are generated at build time rather than on each request.
      - **Decoupling**: The front-end is completely separated from the back-end.
      - **CDN Distribution**: Static assets are served from a CDN for better performance.
      - **API Integration**: Dynamic functionality is handled through APIs and serverless functions.

      ## Micro-Frontends

      Micro-frontends extend the concept of microservices to the front-end, allowing teams to build and deploy parts of the front-end independently.

      Advantages of micro-frontends include:
      - **Independent Development**: Teams can work on different parts of the application without affecting others.
      - **Technology Diversity**: Different parts of the application can use different technologies.
      - **Incremental Upgrades**: Parts of the application can be upgraded independently.
      - **Scalable Teams**: Multiple teams can work on the same application without stepping on each other's toes.

      ## Server Components

      Server Components, introduced by the React team, allow components to be rendered on the server, reducing the JavaScript sent to the client and improving performance.

      Benefits of Server Components include:
      - **Reduced Bundle Size**: Less JavaScript is sent to the client.
      - **Improved Performance**: Initial load times are faster.
      - **Better SEO**: Content is rendered on the server, making it more accessible to search engines.
      - **Access to Server Resources**: Components can access server-only resources like databases.

      ## Conclusion

      Choosing the right architecture pattern depends on the specific requirements of your project. Component-based architecture and Atomic Design are great for organizing your UI code, JAMstack is excellent for content-focused websites, micro-frontends work well for large applications with multiple teams, and Server Components can significantly improve performance.

      By understanding these patterns and their trade-offs, you can make informed decisions about the architecture of your front-end applications.
    `,
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["Architecture", "Front-end", "React", "Design Patterns"],
    author: "Amirmohammad Khodabande",
    date: "2023-12-15",
    slug: "modern-frontend-architecture",
    relatedPosts: ["2", "3"],
  },
  {
    id: "2",
    title: "Integrating AI in Web Applications",
    excerpt: "How to leverage AI capabilities in your web applications",
    content: `
      # Integrating AI in Web Applications

      Artificial Intelligence (AI) is transforming the way we build web applications, enabling more personalized, intelligent, and efficient user experiences. In this article, we'll explore how to integrate AI capabilities into your web applications.

      ## Why Integrate AI in Web Applications?

      AI can enhance web applications in numerous ways:
      - **Personalization**: Tailor content and recommendations to individual users.
      - **Automation**: Automate repetitive tasks and workflows.
      - **Natural Language Processing**: Enable conversational interfaces and content analysis.
      - **Computer Vision**: Process and analyze images and videos.
      - **Predictive Analytics**: Forecast trends and user behavior.

      ## AI Integration Approaches

      ### 1. API-Based Integration

      The simplest way to add AI to your web application is by using third-party AI APIs:

      - **OpenAI API**: For text generation, completion, and embeddings.
      - **Google Cloud Vision**: For image analysis and recognition.
      - **Amazon Rekognition**: For facial analysis and object detection.
      - **IBM Watson**: For natural language understanding and speech recognition.

      Example of using the OpenAI API with JavaScript:

      \`\`\`javascript
      async function generateText(prompt) {
        const response = await fetch('https://api.openai.com/v1/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': \`Bearer \${API_KEY}\`
          },
          body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 100
          })
        });
        
        const data = await response.json();
        return data.choices[0].text;
      }
      \`\`\`

      ### 2. Client-Side AI with TensorFlow.js

      TensorFlow.js allows you to run machine learning models directly in the browser:

      - **Pre-trained Models**: Use existing models for common tasks.
      - **Transfer Learning**: Adapt pre-trained models to your specific needs.
      - **Custom Models**: Train and deploy your own models.

      Example of using a pre-trained model for image classification:

      \`\`\`javascript
      import * as tf from '@tensorflow/tfjs';
      import * as mobilenet from '@tensorflow-models/mobilenet';

      async function classifyImage(imageElement) {
        const model = await mobilenet.load();
        const predictions = await model.classify(imageElement);
        return predictions;
      }
      \`\`\`

      ### 3. Server-Side AI Integration

      For more complex AI tasks, you might need to implement server-side processing:

      - **Python with Flask/Django**: Leverage Python's rich AI ecosystem.
      - **Node.js with TensorFlow.js**: Use TensorFlow.js on the server.
      - **Custom AI Microservices**: Build dedicated services for AI functionality.

      ## Real-World AI Integration Examples

      ### 1. Chatbots and Virtual Assistants

      Implement conversational interfaces using natural language processing:

      - **Customer Support**: Automate responses to common queries.
      - **Virtual Shopping Assistants**: Help users find products.
      - **Information Retrieval**: Answer questions about your content.

      ### 2. Content Recommendation Systems

      Use machine learning to recommend relevant content:

      - **Product Recommendations**: Suggest items based on browsing history.
      - **Content Personalization**: Show articles or videos based on user interests.
      - **Related Items**: Display similar products or content.

      ### 3. Image and Video Processing

      Implement computer vision capabilities:

      - **Image Recognition**: Identify objects or people in images.
      - **Content Moderation**: Automatically filter inappropriate content.
      - **Visual Search**: Allow users to search using images.

      ## Best Practices for AI Integration

      1. **Start Small**: Begin with simple AI features and expand gradually.
      2. **Consider Privacy**: Be transparent about data usage and get proper consent.
      3. **Fallback Mechanisms**: Provide alternatives when AI features fail.
      4. **Performance Optimization**: Minimize the impact on page load times.
      5. **Continuous Learning**: Update your models regularly with new data.

      ## Conclusion

      Integrating AI into web applications can significantly enhance user experience and provide valuable functionality. Whether you choose API-based integration, client-side AI, or server-side processing depends on your specific requirements and constraints.

      By starting with clear use cases and following best practices, you can successfully leverage AI to create more intelligent and engaging web applications.
    `,
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["AI", "Web Development", "API", "OpenAI"],
    author: "Amirmohammad Khodabande",
    date: "2023-11-28",
    slug: "ai-in-web-applications",
    relatedPosts: ["1", "3"],
  },
  {
    id: "3",
    title: "Optimizing React Performance",
    excerpt: "Tips and tricks to improve your React application's performance",
    content: `
      # Optimizing React Performance

      React is known for its virtual DOM and efficient rendering, but as applications grow in complexity, performance issues can arise. In this article, we'll explore various techniques to optimize your React application's performance.

      ## Understanding React Rendering

      Before diving into optimization techniques, it's important to understand how React rendering works:

      1. **Component Rendering**: When a component's state or props change, React re-renders the component.
      2. **Virtual DOM**: React creates a virtual representation of the DOM.
      3. **Diffing Algorithm**: React compares the previous virtual DOM with the new one.
      4. **Reconciliation**: React updates only the parts of the actual DOM that have changed.

      ## Common Performance Issues

      React applications can suffer from several performance issues:

      - **Unnecessary Re-renders**: Components re-rendering when they don't need to.
      - **Large Bundle Sizes**: Slow initial load times due to large JavaScript bundles.
      - **Expensive Calculations**: Computationally intensive operations blocking the main thread.
      - **Inefficient State Management**: Poor state structure leading to cascading updates.

      ## Optimization Techniques

      ### 1. Prevent Unnecessary Re-renders

      #### Use React.memo for Functional Components

      \`\`\`jsx
      const MyComponent = React.memo(function MyComponent(props) {
        // Component logic
      });
      \`\`\`

      #### Implement shouldComponentUpdate for Class Components

      \`\`\`jsx
      shouldComponentUpdate(nextProps, nextState) {
        return nextProps.value !== this.props.value;
      }
      \`\`\`

      #### Use PureComponent for Class Components

      \`\`\`jsx
      class MyComponent extends React.PureComponent {
        // Component logic
      }
      \`\`\`

      ### 2. Optimize State Updates

      #### Use Functional Updates

      \`\`\`jsx
      // Instead of this
      setCount(count + 1);

      // Do this
      setCount(prevCount => prevCount + 1);
      \`\`\`

      #### Batch State Updates

      \`\`\`jsx
      // React 18+ automatically batches updates
      function handleClick() {
        setCount(c => c + 1);
        setFlag(f => !f);
        // Only one render will occur
      }
      \`\`\`

      ### 3. Memoize Expensive Calculations

      #### Use useMemo Hook

      \`\`\`jsx
      const memoizedValue = useMemo(() => {
        return computeExpensiveValue(a, b);
      }, [a, b]);
      \`\`\`

      #### Use useCallback for Functions

      \`\`\`jsx
      const memoizedCallback = useCallback(() => {
        doSomething(a, b);
      }, [a, b]);
      \`\`\`

      ### 4. Code Splitting and Lazy Loading

      #### Use React.lazy and Suspense

      \`\`\`jsx
      const LazyComponent = React.lazy(() => import('./LazyComponent'));

      function MyComponent() {
        return (
          <React.Suspense fallback={<div>Loading...</div>}>
            <LazyComponent />
          </React.Suspense>
        );
      }
      \`\`\`

      #### Route-Based Code Splitting

      \`\`\`jsx
      const Home = React.lazy(() => import('./routes/Home'));
      const About = React.lazy(() => import('./routes/About'));

      function App() {
        return (
          <Router>
            <React.Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </React.Suspense>
          </Router>
        );
      }
      \`\`\`

      ### 5. Virtualize Long Lists

      Use libraries like \`react-window\` or \`react-virtualized\` to render only the visible items in long lists:

      \`\`\`jsx
      import { FixedSizeList } from 'react-window';

      function MyList({ items }) {
        const Row = ({ index, style }) => (
          <div style={style}>
            {items[index]}
          </div>
        );

        return (
          <FixedSizeList
            height={500}
            width={300}
            itemCount={items.length}
            itemSize={35}
          >
            {Row}
          </FixedSizeList>
        );
      }
      \`\`\`

      ### 6. Optimize Images and Assets

      - Use appropriate image formats (WebP, AVIF)
      - Implement lazy loading for images
      - Compress and optimize assets

      ### 7. Use Web Workers for CPU-Intensive Tasks

      Move CPU-intensive operations to a separate thread using Web Workers:

      \`\`\`jsx
      // worker.js
      self.addEventListener('message', (e) => {
        const result = performExpensiveCalculation(e.data);
        self.postMessage(result);
      });

      // Component
      function MyComponent() {
        const [result, setResult] = useState(null);
        
        useEffect(() => {
          const worker = new Worker('./worker.js');
          worker.postMessage(data);
          worker.onmessage = (e) => {
            setResult(e.data);
            worker.terminate();
          };
          
          return () => worker.terminate();
        }, [data]);
        
        return <div>{result}</div>;
      }
      \`\`\`

      ## Performance Measurement Tools

      To identify performance issues, use these tools:

      - **React DevTools Profiler**: Visualize component render times.
      - **Lighthouse**: Analyze web app performance.
      - **Chrome Performance Tab**: Detailed performance analysis.
      - **why-did-you-render**: Library to track unnecessary re-renders.

      ## Conclusion

      Optimizing React performance is an ongoing process that requires understanding how React works and applying the right techniques for your specific use case. Start by measuring performance to identify bottlenecks, then apply the appropriate optimizations.

      Remember that premature optimization can lead to more complex code without significant benefits. Always measure the impact of your optimizations to ensure they're actually improving performance.

      By applying these techniques thoughtfully, you can create React applications that are both feature-rich and performant.
    `,
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["React", "Performance", "Optimization", "JavaScript"],
    author: "Amirmohammad Khodabande",
    date: "2023-11-10",
    slug: "optimizing-react-performance",
    relatedPosts: ["1", "2"],
  },
]

export default function BlogPostPage() {
  const { slug } = useParams()
  const { language } = useLanguage()

  // Find the post with the matching slug
  const post = posts.find((p) => p.slug === slug)

  // If post not found, show error message
  if (!post) {
    return (
      <div className="container px-4 md:px-6 py-12 md:py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">{language === "fa" ? "مقاله یافت نشد" : "Article Not Found"}</h1>
        <p className="mb-6">
          {language === "fa"
            ? "متأسفانه مقاله مورد نظر شما یافت نشد."
            : "Sorry, the article you're looking for doesn't exist."}
        </p>
        <Button asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === "fa" ? "بازگشت به وبلاگ" : "Back to Blog"}
          </Link>
        </Button>
      </div>
    )
  }

  // Find related posts
  const relatedPosts = posts.filter((p) => post.relatedPosts.includes(p.id))

  // Function to render markdown content
  const renderMarkdown = (content: string) => {
    // This is a simple implementation. In a real app, you'd use a markdown library
    const lines = content.split("\n")
    return lines.map((line, index) => {
      if (line.startsWith("# ")) {
        return (
          <h1 key={index} className="text-3xl font-bold my-6">
            {line.substring(2)}
          </h1>
        )
      } else if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-2xl font-bold my-5">
            {line.substring(3)}
          </h2>
        )
      } else if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="text-xl font-bold my-4">
            {line.substring(4)}
          </h3>
        )
      } else if (line.startsWith("- ")) {
        return (
          <li key={index} className="ml-6 my-1">
            {line.substring(2)}
          </li>
        )
      } else if (line.startsWith("1. ")) {
        return (
          <li key={index} className="ml-6 my-1 list-decimal">
            {line.substring(3)}
          </li>
        )
      } else if (line.trim() === "") {
        return <br key={index} />
      } else if (line.startsWith("```")) {
        // This is a very simplified code block handling
        return null // Skip the opening and closing code fence lines
      } else if (line.trim().startsWith("**") && line.trim().endsWith("**")) {
        // Bold text
        return (
          <p key={index} className="font-bold my-2">
            {line.replace(/\*\*/g, "")}
          </p>
        )
      } else {
        return (
          <p key={index} className="my-2">
            {line}
          </p>
        )
      }
    })
  }

  return (
    <div className="container px-4 md:px-6 py-12 md:py-16">
      <div className="mb-8">
        <Button variant="outline" size="sm" asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === "fa" ? "بازگشت به وبلاگ" : "Back to Blog"}
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

            <div className="flex flex-wrap items-center text-gray-500 mb-6 gap-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{new Date(post.date).toLocaleDateString(language === "fa" ? "fa-IR" : "en-US")}</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>{post.author}</span>
              </div>
            </div>

            <div className="mb-6">
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="prose dark:prose-invert max-w-none">{renderMarkdown(post.content)}</div>
          </motion.div>
        </div>

        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="sticky top-24"
          >
            <div className="bg-card rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">{language === "fa" ? "درباره نویسنده" : "About the Author"}</h3>

              <div className="flex items-center gap-4 mb-4">
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt={post.author}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold">{post.author}</h4>
                  <p className="text-sm text-gray-500">
                    {language === "fa" ? "توسعه دهنده فرانت اند" : "Front-end Developer"}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-500">
                {language === "fa"
                  ? "متخصص در طراحی و توسعه وب‌سایت‌های مدرن با استفاده از React و Next.js"
                  : "Specialized in designing and developing modern websites using React and Next.js"}
              </p>
            </div>

            <div className="bg-card rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">{language === "fa" ? "مقالات مرتبط" : "Related Articles"}</h3>

              <div className="space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="block group">
                    <div className="flex items-start gap-3">
                      <img
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        className="w-16 h-12 object-cover rounded-md"
                      />
                      <div>
                        <h4 className="font-medium group-hover:text-primary transition-colors">{relatedPost.title}</h4>
                        <p className="text-sm text-gray-500 line-clamp-1">{relatedPost.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
