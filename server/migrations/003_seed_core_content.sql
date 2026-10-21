INSERT INTO service_categories (name, slug, description, display_order, is_active) VALUES
  ('Business IT Services', 'business-it-services', 'Core infrastructure, support, and security services for business environments.', 1, TRUE),
  ('Individual Computer Services', 'computer-services', 'Practical support for desktops, laptops, and personal workstations.', 2, TRUE)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO services (category_id, name, slug, short_description, full_description, meta_title, meta_description, is_published)
SELECT id, 'Managed IT Support', 'managed-it-services', 'Practical, responsive support that keeps day-to-day technology dependable.', 'Support planning, troubleshooting, maintenance, and documentation for teams that need reliable systems.', 'Managed IT Support | A2NY IT WORKS', 'Managed IT support and practical technical assistance for businesses in the Philippines.', TRUE FROM service_categories WHERE slug = 'business-it-services'
ON CONFLICT (slug) DO NOTHING;
INSERT INTO services (category_id, name, slug, short_description, full_description, meta_title, meta_description, is_published)
SELECT id, 'Network Infrastructure', 'network-installation', 'Structured networks, Wi-Fi, routing, and secure connectivity for growing teams.', 'Office network design, installation, configuration, testing, and documentation.', 'Network Installation Services | A2NY IT WORKS', 'Business network installation, Wi-Fi, routing, and infrastructure support.', TRUE FROM service_categories WHERE slug = 'business-it-services'
ON CONFLICT (slug) DO NOTHING;
INSERT INTO services (category_id, name, slug, short_description, full_description, meta_title, meta_description, is_published)
SELECT id, 'Server & Virtualization', 'server-installation', 'On-premises server deployment, administration, backup, and virtualization.', 'Server installation and administration for Windows, Linux, and virtualized business workloads.', 'Server Installation Philippines | A2NY IT WORKS', 'Server installation, administration, and virtualization support for businesses.', TRUE FROM service_categories WHERE slug = 'business-it-services'
ON CONFLICT (slug) DO NOTHING;
INSERT INTO services (category_id, name, slug, short_description, full_description, meta_title, meta_description, is_published)
SELECT id, 'Cybersecurity & Firewall', 'cybersecurity', 'Layered protection, firewall configuration, access controls, and risk reduction.', 'Practical security reviews, firewall configuration, access control, and continuity planning.', 'Business Firewall Solutions | A2NY IT WORKS', 'Business cybersecurity and firewall configuration services.', TRUE FROM service_categories WHERE slug = 'business-it-services'
ON CONFLICT (slug) DO NOTHING;
INSERT INTO services (category_id, name, slug, short_description, full_description, meta_title, meta_description, is_published)
SELECT id, 'Web & Software Development', 'web-development', 'Business websites and custom tools designed around how your team works.', 'Focused web applications and business websites with maintainable code and documentation.', 'Web Development Philippines | A2NY IT WORKS', 'Business web development and custom software services.', TRUE FROM service_categories WHERE slug = 'business-it-services'
ON CONFLICT (slug) DO NOTHING;
INSERT INTO services (category_id, name, slug, short_description, full_description, meta_title, meta_description, is_published)
SELECT id, 'Microsoft 365 & Cloud', 'microsoft-365', 'Cloud productivity, identity, collaboration, and migration support.', 'Microsoft 365 administration, migration planning, access, and collaboration support.', 'Microsoft 365 Administration | A2NY IT WORKS', 'Microsoft 365 and cloud administration support for businesses.', TRUE FROM service_categories WHERE slug = 'business-it-services'
ON CONFLICT (slug) DO NOTHING;
INSERT INTO services (category_id, name, slug, short_description, full_description, meta_title, meta_description, is_published)
SELECT id, 'Computer Repair & Maintenance', 'computer-repair', 'Clear, careful repair and upgrades for desktops, laptops, and workstations.', 'Computer troubleshooting, repair, upgrades, Windows installation, malware removal, and backup assistance.', 'Computer Repair Services | A2NY IT WORKS', 'Computer repair, upgrades, and maintenance services.', TRUE FROM service_categories WHERE slug = 'computer-services'
ON CONFLICT (slug) DO NOTHING;
INSERT INTO services (category_id, name, slug, short_description, full_description, meta_title, meta_description, is_published)
SELECT id, 'IT Consulting', 'it-consulting', 'Straightforward technical direction for infrastructure and business decisions.', 'Technical assessment, planning, documentation, and recommendations aligned to the business requirement.', 'IT Consulting Philippines | A2NY IT WORKS', 'Practical IT consulting for infrastructure and technology planning.', TRUE FROM service_categories WHERE slug = 'business-it-services'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO faq_items (question, answer, display_order, is_published) VALUES
  ('Do you provide IT support for small businesses?', 'Yes. We work with growing businesses that need reliable technical support without building a large internal IT team.', 1, TRUE),
  ('Can you configure MikroTik and Cisco networks?', 'Yes. Network planning, routing, firewall policies, Wi-Fi, and documentation can be scoped around your environment.', 2, TRUE),
  ('Do you offer monthly IT maintenance contracts?', 'Maintenance plans can be tailored to your equipment, response needs, and preferred support model.', 3, TRUE),
  ('Can you manage Windows and Linux servers?', 'Yes. We can assist with installation, configuration, updates, access management, monitoring, and backups.', 4, TRUE)
ON CONFLICT DO NOTHING;
