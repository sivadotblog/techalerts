import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className={clsx('col col--6')}>
            <div className="text--center padding-horiz--md">
              <Heading as="h3">Library One</Heading>
              <p>Documentation for Library One.</p>
              <Link
                className="button button--secondary button--lg"
                to="/docs/library-one/intro">
                Go to Library One
              </Link>
            </div>
          </div>
          <div className={clsx('col col--6')}>
            <div className="text--center padding-horiz--md">
              <Heading as="h3">Library Two</Heading>
              <p>Documentation for Library Two.</p>
              <Link
                className="button button--secondary button--lg"
                to="/docs/library-two/intro">
                Go to Library Two
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.ReactElement {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Tech Alerts documentation hub">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
