import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ThreeDSphere from "./ThreeDSphere";

interface LoadingScreenProps {
  onComplete: () => void;
  isCollapsed: boolean;
}

const LoadingScreen = ({ onComplete, isCollapsed }: LoadingScreenProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showColorfulSS, setShowColorfulSS] = useState(false);

  const devopsLogos = [
    // Container & Orchestration
    { name: "Kubernetes", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg", delay: 0 },
    { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", delay: 0.02 },
    { name: "Helm", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/helm/helm-original.svg", delay: 0.04 },
    { name: "Podman", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/podman/podman-original.svg", delay: 0.06 },
    
    // Cloud Platforms
    { name: "AWS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", delay: 0.08 },
    { name: "Azure", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", delay: 0.1 },
    { name: "Google Cloud", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", delay: 0.12 },
    { name: "DigitalOcean", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg", delay: 0.14 },
    
    // CI/CD & Version Control
    { name: "Jenkins", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg", delay: 0.16 },
    { name: "GitLab", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg", delay: 0.18 },
    { name: "GitHub", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", delay: 0.2 },
    { name: "Bitbucket", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bitbucket/bitbucket-original.svg", delay: 0.22 },
    { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", delay: 0.24 },
    { name: "CircleCI", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/circleci/circleci-plain.svg", delay: 0.26 },
    { name: "Travis CI", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/travis/travis-plain.svg", delay: 0.28 },
    
    // Infrastructure as Code
    { name: "Terraform", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg", delay: 0.3 },
    { name: "Ansible", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg", delay: 0.32 },
    { name: "Vagrant", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vagrant/vagrant-original.svg", delay: 0.34 },
    { name: "Pulumi", url: "https://www.pulumi.com/logos/brand/avatar-on-white.svg", delay: 0.36 },
    { name: "CloudFormation", url: "https://raw.githubusercontent.com/gilbarbara/logos/master/logos/aws-cloudformation.svg", delay: 0.38 },
    
    // Monitoring & Observability
    { name: "Prometheus", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg", delay: 0.4 },
    { name: "Grafana", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg", delay: 0.42 },
    { name: "Elasticsearch", url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/elasticsearch/elasticsearch-original.svg", delay: 0.44 },
    { name: "New Relic", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/newrelic/newrelic-original.svg", delay: 0.46 },
    { name: "Jaeger", url: "https://raw.githubusercontent.com/cncf/artwork/master/projects/jaeger/icon/color/jaeger-icon-color.svg", delay: 0.48 },
    
    // Databases
    { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", delay: 0.5 },
    { name: "Redis", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", delay: 0.52 },
    { name: "MySQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", delay: 0.54 },
    { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", delay: 0.56 },
    { name: "Cassandra", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cassandra/cassandra-original.svg", delay: 0.58 },
    
    // Message Queues & Streaming
    { name: "Apache Kafka", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg", delay: 0.6 },
    { name: "RabbitMQ", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rabbitmq/rabbitmq-original.svg", delay: 0.62 },
    
    // Web Servers & Load Balancers
    { name: "Nginx", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg", delay: 0.64 },
    { name: "Apache", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg", delay: 0.66 },
    
    // Programming Languages
    { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", delay: 0.68 },
    { name: "Go", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg", delay: 0.7 },
    { name: "Java", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", delay: 0.72 },
    { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", delay: 0.74 },
    { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", delay: 0.76 },
    { name: "Rust", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg", delay: 0.78 },
    
    // Frameworks & APIs
    { name: "FastAPI", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", delay: 0.8 },
    { name: "Flask", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", delay: 0.82 },
    { name: "Django", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", delay: 0.84 },
    { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", delay: 0.86 },
    { name: "Express", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", delay: 0.88 },
    
    // Operating Systems
    { name: "Linux", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", delay: 0.9 },
    { name: "Ubuntu", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg", delay: 0.92 },
    { name: "CentOS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/centos/centos-original.svg", delay: 0.94 },
    { name: "Debian", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/debian/debian-original.svg", delay: 0.96 },
    { name: "Red Hat", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redhat/redhat-original.svg", delay: 0.98 },
    
    // Development Tools
    { name: "VSCode", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", delay: 1.0 },
    { name: "Vim", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vim/vim-original.svg", delay: 1.02 },
    { name: "IntelliJ", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg", delay: 1.04 },
    { name: "Bash", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg", delay: 1.06 },
    
    // Collaboration & Project Management
    { name: "Jira", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg", delay: 1.08 },
    { name: "Slack", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg", delay: 1.1 },
    { name: "Confluence", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg", delay: 1.12 },
    { name: "Trello", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg", delay: 1.14 },
    
    // Security & Secrets Management
    { name: "HashiCorp Vault", url: "https://raw.githubusercontent.com/gilbarbara/logos/master/logos/vault.svg", delay: 1.16 },
    
    // Testing
    { name: "Selenium", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg", delay: 1.18 },
    { name: "Jest", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg", delay: 1.2 },
    
    // Build Tools
    { name: "Gradle", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gradle/gradle-original.svg", delay: 1.22 },
    { name: "Maven", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg", delay: 1.24 },
    { name: "Webpack", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg", delay: 1.26 }
  ];

  useEffect(() => {
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 2000);

    const colorfulTimer = setTimeout(() => {
      setShowColorfulSS(true);
    }, 1800);

    const closeTimer = setTimeout(() => {
      setShowText(false);
      setIsClosing(true);
      setTimeout(onComplete, 800);
    }, 4500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(colorfulTimer);
      clearTimeout(closeTimer);
    };
  }, [onComplete]);

  const getRandomStartPosition = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const side = Math.floor(Math.random() * 4);
    
    switch (side) {
      case 0: // Top
        return {
          left: Math.random() * screenWidth + 'px',
          top: '-100px'
        };
      case 1: // Right
        return {
          left: screenWidth + 100 + 'px',
          top: Math.random() * screenHeight + 'px'
        };
      case 2: // Bottom
        return {
          left: Math.random() * screenWidth + 'px',
          top: screenHeight + 100 + 'px'
        };
      case 3: // Left
        return {
          left: '-100px',
          top: Math.random() * screenHeight + 'px'
        };
      default:
        return { left: '-100px', top: '-100px' };
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/10"
      initial={{ opacity: 1, scale: 1 }}
      animate={{ 
        opacity: isClosing ? 0 : 1,
        scale: isClosing ? 0.08 : 1,
        x: isClosing ? -window.innerWidth/2 + 60 : 0,
        y: isClosing ? -window.innerHeight/2 + 60 : 0,
        borderRadius: isClosing ? "50%" : "0%"
      }}
      transition={{ duration: isClosing ? 1.8 : 0, ease: [0.16, 1, 0.3, 1], type: "tween" }}
    >
      {/* DevOps Logos Animation */}
      {devopsLogos.map((logo, index) => {
        const startPos = getRandomStartPosition();
        return (
          <motion.img
            key={logo.name}
            src={logo.url}
            alt={logo.name}
            className="absolute w-12 h-12"
            initial={{ 
              ...startPos,
              scale: 0,
              opacity: 0
            }}
            animate={{ 
              left: '50%', 
              top: '50%',
              x: '-50%',
              y: '-50%',
              scale: [0, 1.1, 1, 0],
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration: 3.2,
              delay: logo.delay,
              ease: [0.16, 1, 0.3, 1],
              type: "tween"
            }}
          />
        );
      })}

      {/* Central SS Logo */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center -mt-20"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, type: "spring", stiffness: 150, delay: 0.5 }}
      >
        <div className="w-32 h-32 glass-morphism-strong rounded-full flex items-center justify-center text-white font-bold text-4xl">
          <span>SS</span>
        </div>
      </motion.div>

      {/* Welcome Text */}
      {showText && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center mt-40 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl lg:text-6xl font-bold gradient-text-premium" style={{
            lineHeight: '1.3'
          }}>
            Let&apos;s Build Together
          </h1>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LoadingScreen;