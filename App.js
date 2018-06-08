import React from 'react';
import { FlatList } from 'react-native';
import { getNews } from './src/news';
import { Header } from 'react-native-elements';
import Article from './src/components/Article';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], refreshing: true };
    this.fetchNews = this.fetchNews.bind(this);
  }  

  componentDidMount() {
    this.fetchNews();
  }

  fetchNews() {
    getNews()
      .then(articles => this.setState({ articles, refreshing: false }))
      .catch(() => this.setState({ refreshing: false }));
  }

  handleRefresh() {
    this.setState(
      {
        refreshing: true
      }, 
      () => this.fetchNews()
    );
  }

  render() {
    return (
        <React.Fragment>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: "Today", style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
          backgroundColor={'#f49542'}
        />
        <FlatList
        data={this.state.articles}
        renderItem={({ item }) => <Article article={item} />}
        keyExtractor={item => item.url}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh.bind(this)}
        />
        </React.Fragment>
    );
  }
}
