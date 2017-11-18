// import React, { Component } from "react";
// import Link from "gatsby-link";
// import Helmet from 'react-helmet';

 
// const NavLink = props => {
//   if (!props.test) {
//     return <Link to={props.url}>{props.text}</Link>;
//   } else {
//     return <span>{props.text}</span>;
//   }
// };
 
// const TagPage = ({ data, pathContext }) => {
//   const { group, index, first, last } = pathContext;
//   const previousUrl = index - 1 == 1 ? "" : (index - 1).toString();
//   const nextUrl = (index + 1).toString();
//   // const { data } = this.props;
//   const { edges: nodes } = data.allMarkdownRemark;
 
//   return (

//       <div className="home-template">
//         <Helmet>
//           <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
//         </Helmet>

//         <header className="site-header outer" style={{backgroundImage: 'url(https://casper.ghost.org/v1.0.0/images/blog-cover.jpg)' }}>
//             <div className="inner">
//                 <div className="site-header-content">
//                     <h1 className="site-title">
//                         Netlify Gatsby Blog
//                     </h1>
//                     <h2 className="site-description">My Super Cool Tagline</h2>
//                 </div>
//             </div>
//         </header>

        
//         <h4>{data.allMarkdownRemark.totalCount} nodes</h4>

//         <main id="site-main" className="site-main outer" role="main">

//             <div className="inner">

//                 <div className="post-feed">

//                     {group.map(({ node }) => (

//                         <article className="post-card post">
//                             <Link className="post-card-image-link" to={node.frontmatter.path}>
//                                 <div className="post-card-image" style={{backgroundImage: 'url(' + node.frontmatter.featuredImage + ')'}}></div>
//                             </Link>
//                             <div className="post-card-content">
//                                 <Link className="post-card-content-link" to={node.frontmatter.path}> 
//                                     <header className="post-card-header">
//                                         <span className="post-card-tags">{node.frontmatter.tags[0]}</span>
//                                         <h2 className="post-card-title">{node.frontmatter.title}</h2>
//                                     </header>
//                                     <section className="post-card-excerpt">
//                                         <p>{node.frontmatter.description}</p>
//                                     </section>
//                                 </Link>
//                                 <footer className="post-card-meta">
//                                     <img className="author-profile-image" src={ node.frontmatter.featuredImage } alt="my name" />
//                                     <span className="post-card-author">Author Name</span>
//                                 </footer>
//                             </div>
//                         </article>

//                     ))}

//                     <div className="previousLink">
//                       <NavLink test={first} url={previousUrl} text="Go to Previous Page" />
//                     </div>
//                     <div className="nextLink">
//                       <NavLink test={last} url={nextUrl} text="Go to Next Page" />
//                     </div>
//                 </div>
//             </div>
//         </main>
//     </div>
    
//   );
// }

// export default TagPage;
 
// export const pageQuery = graphql`
//   query TagQuery {
//     allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
//       totalCount
//       edges {
//         node {
//           excerpt(pruneLength: 40)
//           id
//           frontmatter {
//             title
//             templateKey
//             date(formatString: "MMMM DD, YYYY")
//             path
//           }
//         }
//       }
//     }
//   }
// `;


import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

export default class TagPage extends React.Component {

  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <section className="section">
        <Helmet>
          <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
        </Helmet>
        <div className="container">
          {posts.filter(post => post.node.frontmatter.templateKey === 'blog-post').map(({ node: post }) => {
            return (
              <div className="content" style={{ border: '1px solid #eaecee', padding: '2em 4em' }} key={post.id}>
                <p>
                  <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
                  <span> &bull; </span>
                  <small>{post.frontmatter.date}</small>
                </p>
                <p>
                  {post.excerpt}
                  <br />
                  <br />
                  <Link className="button is-info is-small" to={post.frontmatter.path}>
                    Keep Reading
                  </Link>
                </p>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}

export const pageQuery = graphql`
  query TagQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`;