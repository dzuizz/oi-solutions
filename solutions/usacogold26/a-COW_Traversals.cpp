#include<bits/stdc++.h>
using namespace std;
#define int long long
namespace dsu{
  vector<int> pa,sz;
  void init(int n){
    pa.resize(n);
    sz.resize(n,1);
    iota(pa.begin(),pa.end(),0);
  }
  int f(int x){ return x==pa[x]?x:pa[x]=f(pa[x]); }
  void m(int a,int b){
    a=f(a),b=f(b);
    if(a==b) return;
    pa[a]=b;
    sz[b]+=sz[a];
  }
};
signed main(){
  ios_base::sync_with_stdio(0); cin.tie(0); cout.tie(0);
  int n; cin>>n;
  int p[n]; for(int i=0;i<n;++i){
    cin>>p[i]; --p[i];
  }
  int m; cin>>m;
  int col[n]{};
  pair<int,int> qrys[m];  // x,col_x
  for(int i=0;i<m;++i){
    int x; char c;
    cin>>x>>c; --x;
    qrys[i]={x,col[x]};
    col[x]=(c=='C'?1:c=='O'?2:3);
  }
  dsu::init(n);
  for(int i=0;i<n;++i) if(!col[i])
    dsu::m(i,p[i]);

  int res[4]{}, ans[m][3];
  for(int i=0;i<n;++i) if(col[i])
    res[col[i]]+=dsu::sz[i];

  for(int i=m-1;i>=0;--i){
    for(int j:{0,1,2}) ans[i][j]=res[j+1];
    auto[x,colx]=qrys[i];

    int sz=dsu::sz[x];
    res[col[x]]-=sz;

    if(!(col[x]=colx)) dsu::m(x,p[x]);
    res[col[dsu::f(x)]]+=sz;
  }
  for(int i=0;i<m;++i){
    for(int j:{0,1,2}) cout<<ans[i][j]<<" ";
    cout<<'\n';
  }
  cout<<'\n';
  return 0;
}

