// https://codebreaker.xyz/problem/swords
#include<bits/stdc++.h>
using namespace std;
int main(){
  ios_base::sync_with_stdio(0); cin.tie(0); cout.tie(0);
  int n; cin>>n;
  pair<int,int> a[n];
  for(auto&[p,q]:a) cin>>p>>q;
  sort(a,a+n);
  int s[n],_s=0;
  for(int i=0;i<n;++i){
    while(_s && s[_s-1]<=a[i].second) --_s;
    s[_s++]=a[i].second;
  }
  cout<<_s<<'\n';
  return 0;
}

