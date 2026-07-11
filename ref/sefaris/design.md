# Sefaris Agent ve Section Sistemi Tasarımı

## Amaç

Kaynak SEO / GEO / AEO raporunu değiştirmeden 11 uygulanabilir section ve bir yönetim dokümanına ayırmak; içerik yazımı, uygulama, kalite kontrol ve ilerleme takibini açık agent sorumluluklarıyla yönetmek.

## Mimari

- `sections/`: Tek doğrusal yürütme zincirindeki 12 çalışma dokümanı.
- `agents/`: Birbirinden ayrılmış içerik, uygulama, kalite ve takip rolleri.
- `orchestrator/`: Görev ataması, kapsam kontrolü, kalite kapıları ve tamamlanma kararları.
- `manifest.md`: Kaynak ile sectionlar arasındaki değişmez eşleme.

## Akış

1. Orkestratör sıradaki sectionı açar ve kapsamı tanımlar.
2. SEO Specialist section için gerçek yayın içeriğini üretir.
3. Quality Controller içeriği SEO, GEO, AEO ve doğrulanabilirlik açısından denetler.
4. Section Executor yalnızca onaylanan kapsamı projeye uygular.
5. Quality Controller teknik doğrulamayı tekrarlar.
6. Progress Tracker kanıtları kaydeder; orkestratör sectionı tamamlar veya revizyona gönderir.

## Başarı Ölçütleri

- Kaynak dosyanın içeriği değişmez.
- 12 section dokümanı eksiksiz ve doğrusal bağlantılıdır.
- Her sectionda içerik üretim brifi, teslimatlar, kabul kriterleri ve yönetim alanları vardır.
- SEO Specialist yalnızca tavsiye değil, yayına hazır içerik üretmekle yükümlüdür.
- Orkestratör varsayımları görünür kılar, minimum kapsamı uygular ve kanıtsız tamamlanma kabul etmez.
